import { allTeams, premierLeagueTeams, laLigaTeams, serieATeams, bundesligaTeams, ligue1Teams, teamStatsMap } from "./leagues";
function getFixtureDate(matchweek) {
  const seasonStart = /* @__PURE__ */ new Date("2025-08-16");
  const daysToAdd = (matchweek - 1) * 7;
  const fixtureDate = new Date(seasonStart);
  fixtureDate.setDate(fixtureDate.getDate() + daysToAdd);
  return fixtureDate.toISOString().split("T")[0];
}
function generatePremierLeagueFixtures() {
  const fixtures = [];
  const mw1Fixtures = [
    { home: 42, away: 63, time: "12:30", tv: "Sky Sports" },
    // Arsenal vs Nottingham Forest
    { home: 40, away: 44, time: "15:00", tv: "Sky Sports" },
    // Liverpool vs Burnley (promoted)
    { home: 50, away: 49, time: "17:30", tv: "Sky Sports" },
    // Man City vs Chelsea
    { home: 47, away: 65, time: "15:00", tv: "Sky Sports" },
    // Tottenham vs Aston Villa
    { home: 33, away: 36, time: "15:00", tv: "Sky Sports" },
    // Man United vs Fulham
    { home: 34, away: 35, time: "15:00", tv: "Sky Sports" },
    // Newcastle vs Bournemouth
    { home: 45, away: 51, time: "15:00", tv: "Sky Sports" },
    // Everton vs Brighton
    { home: 48, away: 52, time: "15:00", tv: "Sky Sports" },
    // West Ham vs Crystal Palace
    { home: 55, away: 39, time: "15:00", tv: "Sky Sports" },
    // Brentford vs Wolves
    { home: 62, away: 66, time: "20:00", tv: "Sky Sports" }
    // Sheffield United vs Leeds United
  ];
  mw1Fixtures.forEach((fix, idx) => {
    const homeTeam = premierLeagueTeams.find((t) => t.id === fix.home);
    const awayTeam = premierLeagueTeams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 1e3 + idx,
        homeTeam,
        awayTeam,
        date: "2025-08-16",
        time: fix.time,
        league: "Premier League",
        leagueId: 39,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 1,
        tvChannel: fix.tv
      });
    }
  });
  const mw2Fixtures = [
    { home: 49, away: 42, time: "12:30", tv: "BT Sport" },
    // Chelsea vs Arsenal
    { home: 63, away: 40, time: "17:30", tv: "Sky Sports" },
    // Forest vs Liverpool
    { home: 65, away: 50, time: "15:00", tv: "Sky Sports" },
    // Aston Villa vs Man City
    { home: 36, away: 34, time: "15:00", tv: "Sky Sports" }
    // Fulham vs Newcastle
  ];
  mw2Fixtures.forEach((fix, idx) => {
    const homeTeam = premierLeagueTeams.find((t) => t.id === fix.home);
    const awayTeam = premierLeagueTeams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 1100 + idx,
        homeTeam,
        awayTeam,
        date: "2025-08-23",
        time: fix.time,
        league: "Premier League",
        leagueId: 39,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 2,
        tvChannel: fix.tv
      });
    }
  });
  return fixtures;
}
function generateLaLigaFixtures() {
  const fixtures = [];
  const mw1Fixtures = [
    { home: 529, away: 532, time: "21:00", date: "2025-08-15" },
    // Barcelona vs Valencia
    { home: 541, away: 536, time: "21:00", date: "2025-08-16" },
    // Real Madrid vs Sevilla
    { home: 530, away: 543, time: "18:30", date: "2025-08-17" },
    // Atletico vs Betis
    { home: 531, away: 533, time: "16:15", date: "2025-08-17" }
    // Athletic vs Villarreal
  ];
  mw1Fixtures.forEach((fix, idx) => {
    const homeTeam = laLigaTeams.find((t) => t.id === fix.home);
    const awayTeam = laLigaTeams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 2e3 + idx,
        homeTeam,
        awayTeam,
        date: fix.date,
        time: fix.time,
        league: "La Liga",
        leagueId: 140,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 1
      });
    }
  });
  const barca = laLigaTeams.find((t) => t.id === 529);
  const madrid = laLigaTeams.find((t) => t.id === 541);
  if (barca && madrid) {
    fixtures.push({
      id: 2999,
      homeTeam: madrid,
      awayTeam: barca,
      date: "2025-10-26",
      time: "21:00",
      league: "La Liga",
      leagueId: 140,
      status: "scheduled",
      venue: "Santiago Bernab\xE9u",
      matchweek: 10,
      tvChannel: "DAZN"
    });
  }
  return fixtures;
}
function generateSerieAFixtures() {
  const fixtures = [];
  const mw1Fixtures = [
    { home: 505, away: 514, time: "18:30", date: "2025-08-17" },
    // Inter vs Genoa
    { home: 489, away: 503, time: "20:45", date: "2025-08-17" },
    // Milan vs Torino
    { home: 496, away: 867, time: "20:45", date: "2025-08-18" },
    // Juventus vs Como
    { home: 492, away: 500, time: "18:30", date: "2025-08-18" }
    // Napoli vs Bologna
  ];
  mw1Fixtures.forEach((fix, idx) => {
    const homeTeam = serieATeams.find((t) => t.id === fix.home);
    const awayTeam = serieATeams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 3e3 + idx,
        homeTeam,
        awayTeam,
        date: fix.date,
        time: fix.time,
        league: "Serie A",
        leagueId: 135,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 1
      });
    }
  });
  return fixtures;
}
function generateBundesligaFixtures() {
  const fixtures = [];
  const mw1Fixtures = [
    { home: 157, away: 176, time: "20:30", date: "2025-08-15" },
    // Bayern vs Wolfsburg
    { home: 165, away: 169, time: "15:30", date: "2025-08-16" },
    // Dortmund vs Frankfurt
    { home: 168, away: 173, time: "15:30", date: "2025-08-16" },
    // Leverkusen vs Leipzig
    { home: 172, away: 174, time: "18:30", date: "2025-08-16" }
    // Stuttgart vs Freiburg
  ];
  mw1Fixtures.forEach((fix, idx) => {
    const homeTeam = bundesligaTeams.find((t) => t.id === fix.home);
    const awayTeam = bundesligaTeams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 4e3 + idx,
        homeTeam,
        awayTeam,
        date: fix.date,
        time: fix.time,
        league: "Bundesliga",
        leagueId: 78,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 1
      });
    }
  });
  return fixtures;
}
function generateLigue1Fixtures() {
  const fixtures = [];
  const mw1Fixtures = [
    { home: 85, away: 108, time: "21:00", date: "2025-08-15" },
    // PSG vs Le Havre
    { home: 81, away: 93, time: "17:00", date: "2025-08-16" },
    // Marseille vs Reims
    { home: 91, away: 95, time: "21:00", date: "2025-08-16" },
    // Monaco vs Strasbourg
    { home: 79, away: 94, time: "15:00", date: "2025-08-17" }
    // Lille vs Rennes
  ];
  mw1Fixtures.forEach((fix, idx) => {
    const homeTeam = ligue1Teams.find((t) => t.id === fix.home);
    const awayTeam = ligue1Teams.find((t) => t.id === fix.away);
    if (homeTeam && awayTeam) {
      fixtures.push({
        id: 5e3 + idx,
        homeTeam,
        awayTeam,
        date: fix.date,
        time: fix.time,
        league: "Ligue 1",
        leagueId: 61,
        status: "scheduled",
        venue: homeTeam.venue,
        matchweek: 1
      });
    }
  });
  return fixtures;
}
const upcomingMatches = [
  ...generatePremierLeagueFixtures(),
  ...generateLaLigaFixtures(),
  ...generateSerieAFixtures(),
  ...generateBundesligaFixtures(),
  ...generateLigue1Fixtures()
].sort((a, b) => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.time.localeCompare(b.time);
});
const liveMatches = [];
function getHeadToHead(team1Id, team2Id) {
  const team1 = allTeams.find((t) => t.id === team1Id);
  const team2 = allTeams.find((t) => t.id === team2Id);
  const h2hData = {
    // Arsenal vs Chelsea
    "42-49": {
      homeTeamWins: 78,
      awayTeamWins: 63,
      draws: 61,
      totalMatches: 202,
      avgGoals: 2.6,
      homeTeamGoals: 285,
      awayTeamGoals: 248,
      recentMatches: [
        { date: "2025-04-23", homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 2, awayScore: 1, competition: "Premier League", season: "2024/25" },
        { date: "2024-10-20", homeTeam: "Chelsea", awayTeam: "Arsenal", homeScore: 1, awayScore: 1, competition: "Premier League", season: "2024/25" },
        { date: "2024-04-23", homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 5, awayScore: 0, competition: "Premier League", season: "2023/24" },
        { date: "2023-10-21", homeTeam: "Chelsea", awayTeam: "Arsenal", homeScore: 2, awayScore: 2, competition: "Premier League", season: "2023/24" },
        { date: "2023-05-02", homeTeam: "Arsenal", awayTeam: "Chelsea", homeScore: 3, awayScore: 1, competition: "Premier League", season: "2022/23" }
      ]
    },
    // Liverpool vs Man City
    "40-50": {
      homeTeamWins: 51,
      awayTeamWins: 41,
      draws: 36,
      totalMatches: 128,
      avgGoals: 2.9,
      homeTeamGoals: 195,
      awayTeamGoals: 168,
      recentMatches: [
        { date: "2025-03-02", homeTeam: "Manchester City", awayTeam: "Liverpool", homeScore: 1, awayScore: 1, competition: "Premier League", season: "2024/25" },
        { date: "2024-11-30", homeTeam: "Liverpool", awayTeam: "Manchester City", homeScore: 2, awayScore: 0, competition: "Premier League", season: "2024/25" },
        { date: "2024-03-10", homeTeam: "Liverpool", awayTeam: "Manchester City", homeScore: 1, awayScore: 1, competition: "Premier League", season: "2023/24" },
        { date: "2023-11-25", homeTeam: "Manchester City", awayTeam: "Liverpool", homeScore: 1, awayScore: 1, competition: "Premier League", season: "2023/24" },
        { date: "2023-04-01", homeTeam: "Manchester City", awayTeam: "Liverpool", homeScore: 4, awayScore: 1, competition: "Premier League", season: "2022/23" }
      ]
    },
    // Real Madrid vs Barcelona
    "541-529": {
      homeTeamWins: 105,
      awayTeamWins: 100,
      draws: 52,
      totalMatches: 257,
      avgGoals: 3.2,
      homeTeamGoals: 435,
      awayTeamGoals: 417,
      recentMatches: [
        { date: "2025-05-11", homeTeam: "Barcelona", awayTeam: "Real Madrid", homeScore: 1, awayScore: 2, competition: "La Liga", season: "2024/25" },
        { date: "2024-10-26", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 0, awayScore: 4, competition: "La Liga", season: "2024/25" },
        { date: "2024-04-21", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 3, awayScore: 2, competition: "La Liga", season: "2023/24" },
        { date: "2024-01-14", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeScore: 4, awayScore: 1, competition: "Supercopa", season: "2023/24" },
        { date: "2023-10-28", homeTeam: "Barcelona", awayTeam: "Real Madrid", homeScore: 1, awayScore: 2, competition: "La Liga", season: "2023/24" }
      ]
    }
  };
  const key1 = `${team1Id}-${team2Id}`;
  const key2 = `${team2Id}-${team1Id}`;
  if (h2hData[key1]) return h2hData[key1];
  if (h2hData[key2]) {
    const data = h2hData[key2];
    return {
      ...data,
      homeTeamWins: data.awayTeamWins,
      awayTeamWins: data.homeTeamWins,
      homeTeamGoals: data.awayTeamGoals,
      awayTeamGoals: data.homeTeamGoals
    };
  }
  const stats1 = teamStatsMap.get(team1Id);
  const stats2 = teamStatsMap.get(team2Id);
  const quality1 = stats1 ? stats1.position : 10;
  const quality2 = stats2 ? stats2.position : 10;
  const totalMatches = 10 + Math.floor(Math.random() * 30);
  const homeAdvantage = 0.15;
  const team1WinRate = Math.max(0.2, Math.min(0.6, 0.4 + (quality2 - quality1) * 0.02 + homeAdvantage));
  const team2WinRate = Math.max(0.2, Math.min(0.5, 0.35 + (quality1 - quality2) * 0.02));
  const drawRate = 1 - team1WinRate - team2WinRate;
  const homeWins = Math.round(totalMatches * team1WinRate);
  const awayWins = Math.round(totalMatches * team2WinRate);
  const draws = totalMatches - homeWins - awayWins;
  const recentMatches = [];
  const dates = ["2025-03-15", "2024-10-12", "2024-04-20", "2023-11-05", "2023-03-18"];
  for (let i = 0; i < 5; i++) {
    const rand = Math.random();
    let homeScore = Math.floor(Math.random() * 3);
    let awayScore = Math.floor(Math.random() * 3);
    if (rand < team1WinRate) {
      homeScore = Math.max(homeScore, awayScore + 1);
    } else if (rand < team1WinRate + drawRate) {
      awayScore = homeScore;
    } else {
      awayScore = Math.max(awayScore, homeScore + 1);
    }
    recentMatches.push({
      date: dates[i],
      homeTeam: team1?.name || "Team 1",
      awayTeam: team2?.name || "Team 2",
      homeScore,
      awayScore,
      competition: team1?.league || "League",
      season: i < 2 ? "2024/25" : i < 4 ? "2023/24" : "2022/23"
    });
  }
  const totalGoals = recentMatches.reduce((acc, m) => acc + m.homeScore + m.awayScore, 0);
  return {
    homeTeamWins: homeWins,
    awayTeamWins: awayWins,
    draws,
    totalMatches,
    avgGoals: Math.round(totalGoals / 5 * 10) / 10,
    homeTeamGoals: homeWins * 2 + draws,
    awayTeamGoals: awayWins * 2 + draws,
    recentMatches
  };
}
const playersMap = /* @__PURE__ */ new Map([
  // Liverpool
  [40, [
    { id: 1, name: "Mohamed Salah", position: "RW", number: 11, goals: 23, assists: 15, appearances: 35, rating: 8.6, nationality: "Egypt", age: 33, currentClub: "Liverpool", marketValue: "45M" },
    { id: 2, name: "Darwin N\xFA\xF1ez", position: "ST", number: 9, goals: 14, assists: 8, appearances: 38, rating: 7.5, nationality: "Uruguay", age: 26, currentClub: "Liverpool", marketValue: "70M" },
    { id: 3, name: "Cody Gakpo", position: "LW", number: 18, goals: 16, assists: 7, appearances: 40, rating: 7.8, nationality: "Netherlands", age: 26, currentClub: "Liverpool", marketValue: "60M" },
    { id: 4, name: "Luis D\xEDaz", position: "LW", number: 7, goals: 12, assists: 6, appearances: 34, rating: 7.6, nationality: "Colombia", age: 28, currentClub: "Liverpool", marketValue: "55M" },
    { id: 5, name: "Alexis Mac Allister", position: "CM", number: 10, goals: 6, assists: 9, appearances: 36, rating: 7.9, nationality: "Argentina", age: 26, currentClub: "Liverpool", marketValue: "80M" }
  ]],
  // Arsenal
  [42, [
    { id: 6, name: "Bukayo Saka", position: "RW", number: 7, goals: 17, assists: 12, appearances: 36, rating: 8.3, nationality: "England", age: 23, currentClub: "Arsenal", marketValue: "120M" },
    { id: 7, name: "Martin \xD8degaard", position: "CAM", number: 8, goals: 10, assists: 11, appearances: 32, rating: 8.1, nationality: "Norway", age: 26, currentClub: "Arsenal", marketValue: "110M" },
    { id: 8, name: "Kai Havertz", position: "ST", number: 29, goals: 15, assists: 8, appearances: 38, rating: 7.8, nationality: "Germany", age: 26, currentClub: "Arsenal", marketValue: "75M" },
    { id: 9, name: "Gabriel Martinelli", position: "LW", number: 11, goals: 11, assists: 7, appearances: 35, rating: 7.6, nationality: "Brazil", age: 24, currentClub: "Arsenal", marketValue: "70M" },
    { id: 10, name: "Declan Rice", position: "CDM", number: 41, goals: 5, assists: 8, appearances: 36, rating: 8, nationality: "England", age: 26, currentClub: "Arsenal", marketValue: "100M" }
  ]],
  // Manchester City - UPDATED: Kevin De Bruyne left in Summer 2025
  [50, [
    { id: 11, name: "Erling Haaland", position: "ST", number: 9, goals: 35, assists: 6, appearances: 38, rating: 8.8, nationality: "Norway", age: 25, currentClub: "Manchester City", marketValue: "180M" },
    { id: 12, name: "Phil Foden", position: "CAM", number: 47, goals: 14, assists: 10, appearances: 34, rating: 8.2, nationality: "England", age: 25, currentClub: "Manchester City", marketValue: "120M" },
    { id: 13, name: "Savinho", position: "RW", number: 26, goals: 8, assists: 12, appearances: 32, rating: 7.7, nationality: "Brazil", age: 21, currentClub: "Manchester City", marketValue: "65M" },
    { id: 14, name: "Jeremy Doku", position: "LW", number: 11, goals: 7, assists: 9, appearances: 30, rating: 7.4, nationality: "Belgium", age: 23, currentClub: "Manchester City", marketValue: "70M" },
    { id: 15, name: "Rodri", position: "CDM", number: 16, goals: 4, assists: 6, appearances: 28, rating: 8.4, nationality: "Spain", age: 29, currentClub: "Manchester City", marketValue: "120M" }
  ]],
  // Chelsea
  [49, [
    { id: 16, name: "Cole Palmer", position: "CAM", number: 20, goals: 25, assists: 14, appearances: 38, rating: 8.5, nationality: "England", age: 23, currentClub: "Chelsea", marketValue: "100M" },
    { id: 17, name: "Nicolas Jackson", position: "ST", number: 15, goals: 18, assists: 8, appearances: 36, rating: 7.6, nationality: "Senegal", age: 24, currentClub: "Chelsea", marketValue: "55M" },
    { id: 18, name: "Noni Madueke", position: "RW", number: 11, goals: 12, assists: 6, appearances: 32, rating: 7.5, nationality: "England", age: 23, currentClub: "Chelsea", marketValue: "50M" },
    { id: 19, name: "Enzo Fern\xE1ndez", position: "CM", number: 8, goals: 5, assists: 9, appearances: 34, rating: 7.4, nationality: "Argentina", age: 24, currentClub: "Chelsea", marketValue: "80M" },
    { id: 20, name: "Mois\xE9s Caicedo", position: "CDM", number: 25, goals: 3, assists: 5, appearances: 36, rating: 7.7, nationality: "Ecuador", age: 23, currentClub: "Chelsea", marketValue: "90M" }
  ]],
  // Real Madrid
  [541, [
    { id: 21, name: "Vin\xEDcius Jr", position: "LW", number: 7, goals: 22, assists: 11, appearances: 36, rating: 8.6, nationality: "Brazil", age: 25, currentClub: "Real Madrid", marketValue: "180M" },
    { id: 22, name: "Kylian Mbapp\xE9", position: "ST", number: 9, goals: 26, assists: 9, appearances: 38, rating: 8.5, nationality: "France", age: 26, currentClub: "Real Madrid", marketValue: "180M" },
    { id: 23, name: "Jude Bellingham", position: "CAM", number: 5, goals: 14, assists: 10, appearances: 34, rating: 8.3, nationality: "England", age: 22, currentClub: "Real Madrid", marketValue: "150M" },
    { id: 24, name: "Rodrygo", position: "RW", number: 11, goals: 10, assists: 8, appearances: 35, rating: 7.8, nationality: "Brazil", age: 24, currentClub: "Real Madrid", marketValue: "100M" },
    { id: 25, name: "Federico Valverde", position: "CM", number: 8, goals: 6, assists: 7, appearances: 36, rating: 8, nationality: "Uruguay", age: 27, currentClub: "Real Madrid", marketValue: "120M" }
  ]],
  // Barcelona
  [529, [
    { id: 26, name: "Lamine Yamal", position: "RW", number: 19, goals: 15, assists: 18, appearances: 40, rating: 8.7, nationality: "Spain", age: 18, currentClub: "Barcelona", marketValue: "150M" },
    { id: 27, name: "Robert Lewandowski", position: "ST", number: 9, goals: 28, assists: 6, appearances: 38, rating: 8.4, nationality: "Poland", age: 37, currentClub: "Barcelona", marketValue: "15M" },
    { id: 28, name: "Raphinha", position: "LW", number: 11, goals: 18, assists: 12, appearances: 36, rating: 8.2, nationality: "Brazil", age: 28, currentClub: "Barcelona", marketValue: "70M" },
    { id: 29, name: "Pedri", position: "CM", number: 8, goals: 7, assists: 12, appearances: 32, rating: 8.1, nationality: "Spain", age: 22, currentClub: "Barcelona", marketValue: "100M" },
    { id: 30, name: "Gavi", position: "CM", number: 6, goals: 4, assists: 8, appearances: 28, rating: 7.8, nationality: "Spain", age: 21, currentClub: "Barcelona", marketValue: "80M" }
  ]],
  // Bayern Munich
  [157, [
    { id: 31, name: "Harry Kane", position: "ST", number: 9, goals: 36, assists: 10, appearances: 38, rating: 8.9, nationality: "England", age: 32, currentClub: "Bayern Munich", marketValue: "80M" },
    { id: 32, name: "Jamal Musiala", position: "CAM", number: 42, goals: 14, assists: 12, appearances: 36, rating: 8.4, nationality: "Germany", age: 22, currentClub: "Bayern Munich", marketValue: "130M" },
    { id: 33, name: "Michael Olise", position: "RW", number: 7, goals: 12, assists: 10, appearances: 32, rating: 8.1, nationality: "France", age: 23, currentClub: "Bayern Munich", marketValue: "70M" },
    { id: 34, name: "Leroy San\xE9", position: "LW", number: 10, goals: 10, assists: 11, appearances: 34, rating: 7.8, nationality: "Germany", age: 29, currentClub: "Bayern Munich", marketValue: "50M" },
    { id: 35, name: "Joshua Kimmich", position: "CDM", number: 6, goals: 3, assists: 9, appearances: 35, rating: 8, nationality: "Germany", age: 30, currentClub: "Bayern Munich", marketValue: "50M" }
  ]],
  // PSG - UPDATED: Post-Mbappé era
  [85, [
    { id: 36, name: "Bradley Barcola", position: "LW", number: 29, goals: 18, assists: 10, appearances: 36, rating: 8, nationality: "France", age: 22, currentClub: "PSG", marketValue: "70M" },
    { id: 37, name: "Ousmane Demb\xE9l\xE9", position: "RW", number: 10, goals: 14, assists: 14, appearances: 34, rating: 7.9, nationality: "France", age: 28, currentClub: "PSG", marketValue: "60M" },
    { id: 38, name: "Gon\xE7alo Ramos", position: "ST", number: 9, goals: 16, assists: 6, appearances: 32, rating: 7.7, nationality: "Portugal", age: 24, currentClub: "PSG", marketValue: "50M" },
    { id: 39, name: "Vitinha", position: "CM", number: 17, goals: 6, assists: 12, appearances: 36, rating: 7.9, nationality: "Portugal", age: 25, currentClub: "PSG", marketValue: "75M" },
    { id: 40, name: "Warren Za\xEFre-Emery", position: "CM", number: 33, goals: 5, assists: 7, appearances: 34, rating: 7.6, nationality: "France", age: 19, currentClub: "PSG", marketValue: "60M" }
  ]],
  // Napoli - UPDATED: Kevin De Bruyne joined Summer 2025
  [492, [
    { id: 41, name: "Kevin De Bruyne", position: "CAM", number: 17, goals: 8, assists: 14, appearances: 28, rating: 8.2, nationality: "Belgium", age: 34, currentClub: "Napoli", previousClubs: ["Manchester City", "Wolfsburg", "Chelsea"], marketValue: "25M", joinedDate: "2025-07-01" },
    { id: 42, name: "Victor Osimhen", position: "ST", number: 9, goals: 22, assists: 5, appearances: 32, rating: 8.1, nationality: "Nigeria", age: 26, currentClub: "Napoli", marketValue: "100M" },
    { id: 43, name: "Khvicha Kvaratskhelia", position: "LW", number: 77, goals: 14, assists: 12, appearances: 34, rating: 8, nationality: "Georgia", age: 24, currentClub: "Napoli", marketValue: "85M" },
    { id: 44, name: "Giovanni Di Lorenzo", position: "RB", number: 22, goals: 3, assists: 6, appearances: 35, rating: 7.5, nationality: "Italy", age: 31, currentClub: "Napoli", marketValue: "25M" },
    { id: 45, name: "Andr\xE9-Frank Zambo Anguissa", position: "CM", number: 99, goals: 4, assists: 5, appearances: 33, rating: 7.4, nationality: "Cameroon", age: 29, currentClub: "Napoli", marketValue: "30M" }
  ]],
  // Inter Milan
  [505, [
    { id: 46, name: "Lautaro Mart\xEDnez", position: "ST", number: 10, goals: 24, assists: 6, appearances: 36, rating: 8.3, nationality: "Argentina", age: 28, currentClub: "Inter Milan", marketValue: "100M" },
    { id: 47, name: "Marcus Thuram", position: "ST", number: 9, goals: 18, assists: 8, appearances: 35, rating: 8, nationality: "France", age: 28, currentClub: "Inter Milan", marketValue: "70M" },
    { id: 48, name: "Hakan \xC7alhano\u011Flu", position: "CM", number: 20, goals: 8, assists: 7, appearances: 34, rating: 7.8, nationality: "Turkey", age: 31, currentClub: "Inter Milan", marketValue: "35M" },
    { id: 49, name: "Nicol\xF2 Barella", position: "CM", number: 23, goals: 5, assists: 12, appearances: 35, rating: 8.1, nationality: "Italy", age: 28, currentClub: "Inter Milan", marketValue: "80M" },
    { id: 50, name: "Federico Dimarco", position: "LB", number: 32, goals: 4, assists: 10, appearances: 36, rating: 7.7, nationality: "Italy", age: 27, currentClub: "Inter Milan", marketValue: "55M" }
  ]]
]);
function getPlayers(teamId) {
  return playersMap.get(teamId) || [];
}
export {
  generateBundesligaFixtures,
  generateLaLigaFixtures,
  generateLigue1Fixtures,
  generatePremierLeagueFixtures,
  generateSerieAFixtures,
  getFixtureDate,
  getHeadToHead,
  getPlayers,
  liveMatches,
  playersMap,
  allTeams as teams,
  upcomingMatches
};
