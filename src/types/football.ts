export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  league: string;
  leagueId: number;
  venue?: string;
  founded?: number;
  trophies?: {
    league: number;
    cups: number;
    europe: number;
  };
}

export interface TeamStats {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  form: ('W' | 'D' | 'L')[];
  homeWins: number;
  homePlayed: number;
  awayWins: number;
  awayPlayed: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  points: number;
  position: number;
  homeGoalsFor?: number;
  homeGoalsAgainst?: number;
  awayGoalsFor?: number;
  awayGoalsAgainst?: number;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  number?: number;
  goals: number;
  assists: number;
  appearances: number;
  rating: number;
  photo?: string;
  nationality?: string;
  age?: number;
  currentClub?: string;
  previousClubs?: string[];
  marketValue?: string;
  joinedDate?: string;
}

export interface HeadToHead {
  homeTeamWins: number;
  awayTeamWins: number;
  draws: number;
  totalMatches: number;
  avgGoals: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  recentMatches: {
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    competition: string;
    season: string;
  }[];
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  league: string;
  leagueId: number;
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'tbd';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  venue?: string;
  referee?: string;
  matchweek?: number;
  tvChannel?: string;
}

export interface Prediction {
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  over25Prob: number;
  under25Prob: number;
  over15Prob: number;
  under15Prob: number;
  over35Prob: number;
  bttsProb: number;
  bttsNoProb: number;
  predictedScore: { home: number; away: number };
  confidence: 'low' | 'medium' | 'high';
  recommendation: string;
  valueOdds?: {
    type: string;
    suggestedOdds: number;
  }[];
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

export interface Standing {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface HistoricalSeason {
  season: string;
  league: string;
  position: number;
  points: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  topScorer?: string;
  topScorerGoals?: number;
}

export interface TransferRecord {
  player: string;
  fromClub: string;
  toClub: string;
  fee: string;
  date: string;
  type: 'permanent' | 'loan' | 'free';
}
