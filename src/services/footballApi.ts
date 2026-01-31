/**
 * Football API Service
 * 
 * This service handles real-time data fetching from football APIs.
 * Supports: API-Football (api-sports.io) and Football-Data.org
 * 
 * To enable real-time updates:
 * 1. Sign up at https://www.api-football.com/ (100 free requests/day)
 * 2. Create a .env file in project root with:
 *    VITE_FOOTBALL_API_KEY=your_api_key_here
 *    VITE_FOOTBALL_API_HOST=v3.football.api-sports.io
 */

// Types are defined in ../types/football.ts but we define local types here
// to avoid circular dependencies

interface TeamInfo {
  id: number;
  name: string;
  shortName: string;
  logo: string;
}

type Match = {
  id: number;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  date: string;
  time: string;
  venue: string;
  league: number;
  leagueName?: string;
  status: string;
  minute?: number;
  homeScore: number | null;
  awayScore: number | null;
}

type Player = {
  id: number;
  name: string;
  position: string;
  number: number;
  nationality: string;
  photo: string;
  goals: number;
  assists: number;
  appearances: number;
  rating: number;
  yellowCards: number;
  redCards: number;
}

// League standing type for API responses
interface LeagueStanding {
  position: number;
  teamId: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string;
  logo: string;
}

// API Configuration
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || '';
const API_HOST = import.meta.env.VITE_FOOTBALL_API_HOST || 'v3.football.api-sports.io';
const BASE_URL = `https://${API_HOST}`;

// League IDs for API-Football
export const API_LEAGUE_IDS = {
  premier_league: 39,
  la_liga: 140,
  serie_a: 135,
  bundesliga: 78,
  ligue_1: 61,
  championship: 40,
  champions_league: 2,
  europa_league: 3,
};

// Check if API is configured
export const isApiConfigured = (): boolean => {
  return API_KEY !== '' && API_KEY !== 'your_api_key_here';
};

// API request helper
const apiRequest = async (endpoint: string, params: Record<string, string | number> = {}) => {
  if (!isApiConfigured()) {
    console.warn('Football API not configured. Using static data.');
    return null;
  }

  const queryString = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();

  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('API Request failed:', error);
    return null;
  }
};

/**
 * Fetch current league standings
 */
export const fetchLeagueStandings = async (leagueId: number, season: number = 2025): Promise<LeagueStanding[] | null> => {
  const data = await apiRequest('/standings', { league: leagueId, season });
  
  if (!data || !data[0]?.league?.standings) {
    return null;
  }

  const standings = data[0].league.standings[0];
  
  return standings.map((team: any) => ({
    position: team.rank,
    teamId: team.team.id,
    teamName: team.team.name,
    played: team.all.played,
    won: team.all.win,
    drawn: team.all.draw,
    lost: team.all.lose,
    goalsFor: team.all.goals.for,
    goalsAgainst: team.all.goals.against,
    goalDifference: team.goalsDiff,
    points: team.points,
    form: team.form?.split('').slice(-5).join('-') || '',
    logo: team.team.logo,
  }));
};

/**
 * Fetch upcoming fixtures
 */
export const fetchUpcomingFixtures = async (leagueId: number, next: number = 10): Promise<Match[] | null> => {
  const data = await apiRequest('/fixtures', { league: leagueId, next, season: 2025 });
  
  if (!data) return null;

  return data.map((fixture: any) => ({
    id: fixture.fixture.id,
    homeTeam: {
      id: fixture.teams.home.id,
      name: fixture.teams.home.name,
      shortName: fixture.teams.home.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.home.logo,
    },
    awayTeam: {
      id: fixture.teams.away.id,
      name: fixture.teams.away.name,
      shortName: fixture.teams.away.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.away.logo,
    },
    date: fixture.fixture.date,
    time: new Date(fixture.fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    venue: fixture.fixture.venue?.name || 'TBD',
    league: leagueId,
    status: fixture.fixture.status.short,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
  }));
};

/**
 * Fetch live matches
 */
export const fetchLiveMatches = async (leagueId?: number): Promise<Match[] | null> => {
  const params: Record<string, string | number> = { live: 'all' };
  if (leagueId) params.league = leagueId;

  const data = await apiRequest('/fixtures', params);
  
  if (!data) return null;

  return data.map((fixture: any) => ({
    id: fixture.fixture.id,
    homeTeam: {
      id: fixture.teams.home.id,
      name: fixture.teams.home.name,
      shortName: fixture.teams.home.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.home.logo,
    },
    awayTeam: {
      id: fixture.teams.away.id,
      name: fixture.teams.away.name,
      shortName: fixture.teams.away.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.away.logo,
    },
    date: fixture.fixture.date,
    time: new Date(fixture.fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    venue: fixture.fixture.venue?.name || 'TBD',
    league: leagueId || 0,
    status: fixture.fixture.status.short,
    minute: fixture.fixture.status.elapsed,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
  }));
};

/**
 * Fetch team statistics
 */
export const fetchTeamStats = async (teamId: number, leagueId: number, season: number = 2025): Promise<any | null> => {
  const data = await apiRequest('/teams/statistics', { team: teamId, league: leagueId, season });
  
  if (!data) return null;

  return {
    played: data.fixtures.played.total,
    wins: data.fixtures.wins.total,
    draws: data.fixtures.draws.total,
    losses: data.fixtures.loses.total,
    goalsFor: data.goals.for.total.total,
    goalsAgainst: data.goals.against.total.total,
    cleanSheets: data.clean_sheet.total,
    form: data.form?.slice(-5) || '',
    homeRecord: {
      played: data.fixtures.played.home,
      wins: data.fixtures.wins.home,
      draws: data.fixtures.draws.home,
      losses: data.fixtures.loses.home,
    },
    awayRecord: {
      played: data.fixtures.played.away,
      wins: data.fixtures.wins.away,
      draws: data.fixtures.draws.away,
      losses: data.fixtures.loses.away,
    },
    avgGoalsScored: data.goals.for.average.total,
    avgGoalsConceded: data.goals.against.average.total,
  };
};

/**
 * Fetch player statistics for a team
 */
export const fetchTeamPlayers = async (teamId: number, season: number = 2025): Promise<Player[] | null> => {
  const data = await apiRequest('/players', { team: teamId, season });
  
  if (!data) return null;

  return data.map((player: any) => ({
    id: player.player.id,
    name: player.player.name,
    position: player.statistics[0]?.games?.position || 'Unknown',
    number: player.statistics[0]?.games?.number || 0,
    nationality: player.player.nationality,
    photo: player.player.photo,
    goals: player.statistics[0]?.goals?.total || 0,
    assists: player.statistics[0]?.goals?.assists || 0,
    appearances: player.statistics[0]?.games?.appearences || 0,
    rating: parseFloat(player.statistics[0]?.games?.rating || '0'),
    yellowCards: player.statistics[0]?.cards?.yellow || 0,
    redCards: player.statistics[0]?.cards?.red || 0,
  }));
};

/**
 * Fetch head-to-head history
 */
export const fetchHeadToHead = async (team1Id: number, team2Id: number): Promise<any[] | null> => {
  const data = await apiRequest('/fixtures/headtohead', { h2h: `${team1Id}-${team2Id}`, last: 10 });
  
  if (!data) return null;

  return data.map((fixture: any) => ({
    date: fixture.fixture.date,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
    competition: fixture.league.name,
    season: fixture.league.season,
  }));
};

/**
 * Fetch top scorers for a league
 */
export const fetchTopScorers = async (leagueId: number, season: number = 2025): Promise<any[] | null> => {
  const data = await apiRequest('/players/topscorers', { league: leagueId, season });
  
  if (!data) return null;

  return data.slice(0, 20).map((player: any) => ({
    id: player.player.id,
    name: player.player.name,
    team: player.statistics[0]?.team?.name,
    goals: player.statistics[0]?.goals?.total || 0,
    assists: player.statistics[0]?.goals?.assists || 0,
    appearances: player.statistics[0]?.games?.appearences || 0,
    photo: player.player.photo,
  }));
};

/**
 * Fetch today's fixtures across all leagues
 */
export const fetchTodaysFixtures = async (): Promise<Match[] | null> => {
  const today = new Date().toISOString().split('T')[0];
  const data = await apiRequest('/fixtures', { date: today });
  
  if (!data) return null;

  return data.map((fixture: any) => ({
    id: fixture.fixture.id,
    homeTeam: {
      id: fixture.teams.home.id,
      name: fixture.teams.home.name,
      shortName: fixture.teams.home.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.home.logo,
    },
    awayTeam: {
      id: fixture.teams.away.id,
      name: fixture.teams.away.name,
      shortName: fixture.teams.away.name.substring(0, 3).toUpperCase(),
      logo: fixture.teams.away.logo,
    },
    date: fixture.fixture.date,
    time: new Date(fixture.fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    venue: fixture.fixture.venue?.name || 'TBD',
    league: fixture.league.id,
    leagueName: fixture.league.name,
    status: fixture.fixture.status.short,
    homeScore: fixture.goals.home,
    awayScore: fixture.goals.away,
  }));
};

/**
 * Auto-update service - call this periodically to refresh data
 */
export class FootballDataService {
  private updateInterval: number | null = null;
  private callbacks: Map<string, (data: any) => void> = new Map();

  // Start auto-updating data
  startAutoUpdate(intervalMs: number = 60000) {
    if (this.updateInterval) {
      this.stopAutoUpdate();
    }

    this.updateInterval = window.setInterval(async () => {
      await this.refreshAllData();
    }, intervalMs);

    // Initial fetch
    this.refreshAllData();
  }

  // Stop auto-updating
  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  // Register callback for data updates
  onUpdate(key: string, callback: (data: any) => void) {
    this.callbacks.set(key, callback);
  }

  // Remove callback
  offUpdate(key: string) {
    this.callbacks.delete(key);
  }

  // Refresh all data
  private async refreshAllData() {
    if (!isApiConfigured()) {
      console.log('API not configured - using static data');
      return;
    }

    try {
      // Fetch live matches
      const liveMatches = await fetchLiveMatches();
      if (liveMatches) {
        this.callbacks.get('liveMatches')?.(liveMatches);
      }

      // Fetch today's fixtures
      const todaysFixtures = await fetchTodaysFixtures();
      if (todaysFixtures) {
        this.callbacks.get('todaysFixtures')?.(todaysFixtures);
      }

      // Fetch Premier League standings (as example)
      const standings = await fetchLeagueStandings(API_LEAGUE_IDS.premier_league);
      if (standings) {
        this.callbacks.get('standings')?.(standings);
      }

      console.log('Data refreshed at:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }
}

// Singleton instance
export const footballDataService = new FootballDataService();

/**
 * Hook-ready data fetching functions
 * These can be used directly in React components with useEffect
 */
export const useFootballApi = () => {
  return {
    isConfigured: isApiConfigured(),
    fetchStandings: fetchLeagueStandings,
    fetchFixtures: fetchUpcomingFixtures,
    fetchLive: fetchLiveMatches,
    fetchTeamStats,
    fetchPlayers: fetchTeamPlayers,
    fetchH2H: fetchHeadToHead,
    fetchTopScorers,
    fetchToday: fetchTodaysFixtures,
    service: footballDataService,
  };
};
