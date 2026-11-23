const leagues = [
  { id: 39, name: "Premier League", country: "England", logo: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", season: 2025 },
  { id: 140, name: "La Liga", country: "Spain", logo: "\u{1F1EA}\u{1F1F8}", flag: "\u{1F1EA}\u{1F1F8}", season: 2025 },
  { id: 135, name: "Serie A", country: "Italy", logo: "\u{1F1EE}\u{1F1F9}", flag: "\u{1F1EE}\u{1F1F9}", season: 2025 },
  { id: 78, name: "Bundesliga", country: "Germany", logo: "\u{1F1E9}\u{1F1EA}", flag: "\u{1F1E9}\u{1F1EA}", season: 2025 },
  { id: 61, name: "Ligue 1", country: "France", logo: "\u{1F1EB}\u{1F1F7}", flag: "\u{1F1EB}\u{1F1F7}", season: 2025 },
  { id: 40, name: "Championship", country: "England", logo: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", season: 2025 }
];
const premierLeagueTeams = [
  { id: 42, name: "Arsenal", shortName: "ARS", logo: "\u{1F534}", country: "England", league: "Premier League", leagueId: 39, venue: "Emirates Stadium", founded: 1886, trophies: { league: 13, cups: 14, europe: 0 } },
  { id: 40, name: "Liverpool", shortName: "LIV", logo: "\u{1F534}", country: "England", league: "Premier League", leagueId: 39, venue: "Anfield", founded: 1892, trophies: { league: 19, cups: 8, europe: 6 } },
  { id: 50, name: "Manchester City", shortName: "MCI", logo: "\u{1FA75}", country: "England", league: "Premier League", leagueId: 39, venue: "Etihad Stadium", founded: 1880, trophies: { league: 10, cups: 7, europe: 1 } },
  { id: 49, name: "Chelsea", shortName: "CHE", logo: "\u{1F535}", country: "England", league: "Premier League", leagueId: 39, venue: "Stamford Bridge", founded: 1905, trophies: { league: 6, cups: 8, europe: 2 } },
  { id: 33, name: "Manchester United", shortName: "MUN", logo: "\u{1F534}", country: "England", league: "Premier League", leagueId: 39, venue: "Old Trafford", founded: 1878, trophies: { league: 20, cups: 12, europe: 3 } },
  { id: 47, name: "Tottenham Hotspur", shortName: "TOT", logo: "\u26AA", country: "England", league: "Premier League", leagueId: 39, venue: "Tottenham Hotspur Stadium", founded: 1882, trophies: { league: 2, cups: 8, europe: 0 } },
  { id: 34, name: "Newcastle United", shortName: "NEW", logo: "\u26AB", country: "England", league: "Premier League", leagueId: 39, venue: "St. James' Park", founded: 1892, trophies: { league: 4, cups: 6, europe: 0 } },
  { id: 65, name: "Aston Villa", shortName: "AVL", logo: "\u{1F7E4}", country: "England", league: "Premier League", leagueId: 39, venue: "Villa Park", founded: 1874, trophies: { league: 7, cups: 7, europe: 1 } },
  { id: 51, name: "Brighton & Hove Albion", shortName: "BHA", logo: "\u{1F535}", country: "England", league: "Premier League", leagueId: 39, venue: "Amex Stadium", founded: 1901, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 48, name: "West Ham United", shortName: "WHU", logo: "\u{1F377}", country: "England", league: "Premier League", leagueId: 39, venue: "London Stadium", founded: 1895, trophies: { league: 0, cups: 3, europe: 1 } },
  { id: 55, name: "Brentford", shortName: "BRE", logo: "\u{1F41D}", country: "England", league: "Premier League", leagueId: 39, venue: "Gtech Community Stadium", founded: 1889, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 36, name: "Fulham", shortName: "FUL", logo: "\u26AA", country: "England", league: "Premier League", leagueId: 39, venue: "Craven Cottage", founded: 1879, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 35, name: "Bournemouth", shortName: "BOU", logo: "\u{1F352}", country: "England", league: "Premier League", leagueId: 39, venue: "Vitality Stadium", founded: 1899, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 52, name: "Crystal Palace", shortName: "CRY", logo: "\u{1F534}\u{1F535}", country: "England", league: "Premier League", leagueId: 39, venue: "Selhurst Park", founded: 1905, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 63, name: "Nottingham Forest", shortName: "NFO", logo: "\u{1F534}", country: "England", league: "Premier League", leagueId: 39, venue: "City Ground", founded: 1865, trophies: { league: 1, cups: 2, europe: 2 } },
  { id: 39, name: "Wolverhampton Wanderers", shortName: "WOL", logo: "\u{1F7E0}", country: "England", league: "Premier League", leagueId: 39, venue: "Molineux Stadium", founded: 1877, trophies: { league: 3, cups: 4, europe: 0 } },
  { id: 45, name: "Everton", shortName: "EVE", logo: "\u{1F535}", country: "England", league: "Premier League", leagueId: 39, venue: "Goodison Park", founded: 1878, trophies: { league: 9, cups: 5, europe: 0 } },
  // PROMOTED FROM CHAMPIONSHIP 2024/25
  { id: 66, name: "Leeds United", shortName: "LEE", logo: "\u26AA", country: "England", league: "Premier League", leagueId: 39, venue: "Elland Road", founded: 1919, trophies: { league: 3, cups: 1, europe: 0 } },
  { id: 44, name: "Burnley", shortName: "BUR", logo: "\u{1F377}", country: "England", league: "Premier League", leagueId: 39, venue: "Turf Moor", founded: 1882, trophies: { league: 2, cups: 1, europe: 0 } },
  { id: 62, name: "Sheffield United", shortName: "SHU", logo: "\u{1F534}", country: "England", league: "Premier League", leagueId: 39, venue: "Bramall Lane", founded: 1889, trophies: { league: 1, cups: 4, europe: 0 } }
];
const laLigaTeams = [
  { id: 541, name: "Real Madrid", shortName: "RMA", logo: "\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "Santiago Bernab\xE9u", founded: 1902, trophies: { league: 36, cups: 20, europe: 15 } },
  { id: 529, name: "Barcelona", shortName: "BAR", logo: "\u{1F535}\u{1F534}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Spotify Camp Nou", founded: 1899, trophies: { league: 27, cups: 31, europe: 5 } },
  { id: 530, name: "Atletico Madrid", shortName: "ATM", logo: "\u{1F534}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "Civitas Metropolitano", founded: 1903, trophies: { league: 11, cups: 10, europe: 3 } },
  { id: 531, name: "Athletic Bilbao", shortName: "ATH", logo: "\u{1F534}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "San Mam\xE9s", founded: 1898, trophies: { league: 8, cups: 24, europe: 0 } },
  { id: 548, name: "Real Sociedad", shortName: "RSO", logo: "\u{1F535}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "Reale Arena", founded: 1909, trophies: { league: 2, cups: 3, europe: 0 } },
  { id: 543, name: "Real Betis", shortName: "BET", logo: "\u{1F49A}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Benito Villamar\xEDn", founded: 1907, trophies: { league: 1, cups: 3, europe: 0 } },
  { id: 533, name: "Villarreal", shortName: "VIL", logo: "\u{1F7E1}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Estadio de la Cer\xE1mica", founded: 1923, trophies: { league: 0, cups: 0, europe: 1 } },
  { id: 536, name: "Sevilla", shortName: "SEV", logo: "\u26AA\u{1F534}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Ram\xF3n S\xE1nchez-Pizju\xE1n", founded: 1890, trophies: { league: 1, cups: 5, europe: 7 } },
  { id: 547, name: "Girona", shortName: "GIR", logo: "\u{1F534}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "Estadi Montilivi", founded: 1930, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 532, name: "Valencia", shortName: "VAL", logo: "\u{1F987}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Mestalla", founded: 1919, trophies: { league: 6, cups: 8, europe: 0 } },
  { id: 727, name: "Osasuna", shortName: "OSA", logo: "\u{1F534}", country: "Spain", league: "La Liga", leagueId: 140, venue: "El Sadar", founded: 1920, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 538, name: "Celta Vigo", shortName: "CEL", logo: "\u{1F535}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Abanca-Bala\xEDdos", founded: 1923, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 798, name: "Mallorca", shortName: "MLL", logo: "\u{1F534}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Visit Mallorca Estadi", founded: 1916, trophies: { league: 0, cups: 1, europe: 0 } },
  { id: 728, name: "Rayo Vallecano", shortName: "RAY", logo: "\u26A1", country: "Spain", league: "La Liga", leagueId: 140, venue: "Vallecas", founded: 1924, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 546, name: "Getafe", shortName: "GET", logo: "\u{1F535}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Coliseum Alfonso P\xE9rez", founded: 1983, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 534, name: "Las Palmas", shortName: "LPA", logo: "\u{1F7E1}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Estadio Gran Canaria", founded: 1949, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 542, name: "Alaves", shortName: "ALA", logo: "\u{1F535}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "Mendizorrotza", founded: 1921, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 540, name: "Espanyol", shortName: "ESP", logo: "\u{1F535}\u26AA", country: "Spain", league: "La Liga", leagueId: 140, venue: "RCDE Stadium", founded: 1900, trophies: { league: 0, cups: 4, europe: 0 } },
  { id: 720, name: "Real Valladolid", shortName: "VLL", logo: "\u{1F49C}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Jos\xE9 Zorrilla", founded: 1928, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 745, name: "Leganes", shortName: "LEG", logo: "\u{1F535}", country: "Spain", league: "La Liga", leagueId: 140, venue: "Butarque", founded: 1928, trophies: { league: 0, cups: 0, europe: 0 } }
];
const serieATeams = [
  { id: 505, name: "Inter Milan", shortName: "INT", logo: "\u{1F535}\u26AB", country: "Italy", league: "Serie A", leagueId: 135, venue: "San Siro", founded: 1908, trophies: { league: 20, cups: 9, europe: 3 } },
  { id: 489, name: "AC Milan", shortName: "MIL", logo: "\u{1F534}\u26AB", country: "Italy", league: "Serie A", leagueId: 135, venue: "San Siro", founded: 1899, trophies: { league: 19, cups: 5, europe: 7 } },
  { id: 496, name: "Juventus", shortName: "JUV", logo: "\u26AB\u26AA", country: "Italy", league: "Serie A", leagueId: 135, venue: "Allianz Stadium", founded: 1897, trophies: { league: 36, cups: 14, europe: 2 } },
  { id: 492, name: "Napoli", shortName: "NAP", logo: "\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Diego Armando Maradona", founded: 1926, trophies: { league: 3, cups: 6, europe: 0 } },
  { id: 499, name: "Atalanta", shortName: "ATA", logo: "\u{1F535}\u26AB", country: "Italy", league: "Serie A", leagueId: 135, venue: "Gewiss Stadium", founded: 1907, trophies: { league: 0, cups: 1, europe: 1 } },
  { id: 497, name: "AS Roma", shortName: "ROM", logo: "\u{1F7E1}\u{1F534}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Stadio Olimpico", founded: 1927, trophies: { league: 3, cups: 9, europe: 0 } },
  { id: 498, name: "Lazio", shortName: "LAZ", logo: "\u{1F535}\u26AA", country: "Italy", league: "Serie A", leagueId: 135, venue: "Stadio Olimpico", founded: 1900, trophies: { league: 2, cups: 7, europe: 0 } },
  { id: 502, name: "Fiorentina", shortName: "FIO", logo: "\u{1F49C}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Artemio Franchi", founded: 1926, trophies: { league: 2, cups: 6, europe: 0 } },
  { id: 500, name: "Bologna", shortName: "BOL", logo: "\u{1F535}\u{1F534}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Renato Dall'Ara", founded: 1909, trophies: { league: 7, cups: 2, europe: 0 } },
  { id: 503, name: "Torino", shortName: "TOR", logo: "\u{1F377}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Stadio Olimpico Grande Torino", founded: 1906, trophies: { league: 7, cups: 5, europe: 0 } },
  { id: 520, name: "Udinese", shortName: "UDI", logo: "\u26AB\u26AA", country: "Italy", league: "Serie A", leagueId: 135, venue: "Dacia Arena", founded: 1896, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 511, name: "Empoli", shortName: "EMP", logo: "\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Carlo Castellani", founded: 1920, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 514, name: "Genoa", shortName: "GEN", logo: "\u{1F534}\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Luigi Ferraris", founded: 1893, trophies: { league: 9, cups: 1, europe: 0 } },
  { id: 515, name: "Cagliari", shortName: "CAG", logo: "\u{1F534}\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Unipol Domus", founded: 1920, trophies: { league: 1, cups: 0, europe: 0 } },
  { id: 523, name: "Parma", shortName: "PAR", logo: "\u{1F49B}\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Ennio Tardini", founded: 1913, trophies: { league: 0, cups: 3, europe: 2 } },
  { id: 504, name: "Hellas Verona", shortName: "VER", logo: "\u{1F49B}\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Marcantonio Bentegodi", founded: 1903, trophies: { league: 1, cups: 0, europe: 0 } },
  { id: 867, name: "Como", shortName: "COM", logo: "\u{1F535}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Stadio Giuseppe Sinigaglia", founded: 1907, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 522, name: "Lecce", shortName: "LEC", logo: "\u{1F7E1}\u{1F534}", country: "Italy", league: "Serie A", leagueId: 135, venue: "Via del Mare", founded: 1908, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 517, name: "Venezia", shortName: "VEN", logo: "\u{1F7E2}\u{1F7E0}\u26AB", country: "Italy", league: "Serie A", leagueId: 135, venue: "Pier Luigi Penzo", founded: 1907, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 1579, name: "Monza", shortName: "MON", logo: "\u{1F534}\u26AA", country: "Italy", league: "Serie A", leagueId: 135, venue: "U-Power Stadium", founded: 1912, trophies: { league: 0, cups: 0, europe: 0 } }
];
const bundesligaTeams = [
  { id: 157, name: "Bayern Munich", shortName: "BAY", logo: "\u{1F534}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Allianz Arena", founded: 1900, trophies: { league: 33, cups: 20, europe: 6 } },
  { id: 168, name: "Bayer Leverkusen", shortName: "LEV", logo: "\u{1F534}\u26AB", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "BayArena", founded: 1904, trophies: { league: 1, cups: 2, europe: 0 } },
  { id: 165, name: "Borussia Dortmund", shortName: "BVB", logo: "\u{1F7E1}\u26AB", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Signal Iduna Park", founded: 1909, trophies: { league: 8, cups: 5, europe: 1 } },
  { id: 173, name: "RB Leipzig", shortName: "RBL", logo: "\u{1F534}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Red Bull Arena", founded: 2009, trophies: { league: 0, cups: 2, europe: 0 } },
  { id: 172, name: "VfB Stuttgart", shortName: "VFB", logo: "\u{1F534}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "MHP Arena", founded: 1893, trophies: { league: 5, cups: 3, europe: 0 } },
  { id: 169, name: "Eintracht Frankfurt", shortName: "SGE", logo: "\u26AB\u{1F534}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Deutsche Bank Park", founded: 1899, trophies: { league: 1, cups: 5, europe: 1 } },
  { id: 174, name: "SC Freiburg", shortName: "SCF", logo: "\u26AB\u{1F534}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Europa-Park Stadion", founded: 1904, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 176, name: "VfL Wolfsburg", shortName: "WOB", logo: "\u{1F7E2}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Volkswagen Arena", founded: 1945, trophies: { league: 1, cups: 1, europe: 0 } },
  { id: 185, name: "Mainz 05", shortName: "M05", logo: "\u{1F534}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "MEWA Arena", founded: 1905, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 170, name: "FC Augsburg", shortName: "FCA", logo: "\u{1F534}\u{1F7E2}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "WWK Arena", founded: 1907, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 180, name: "Werder Bremen", shortName: "SVW", logo: "\u{1F7E2}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Wohninvest Weserstadion", founded: 1899, trophies: { league: 4, cups: 6, europe: 1 } },
  { id: 184, name: "Borussia M'gladbach", shortName: "BMG", logo: "\u26AB\u26AA\u{1F7E2}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Borussia-Park", founded: 1900, trophies: { league: 5, cups: 3, europe: 2 } },
  { id: 175, name: "Union Berlin", shortName: "FCU", logo: "\u{1F534}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Stadion An der Alten F\xF6rsterei", founded: 1966, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 182, name: "TSG Hoffenheim", shortName: "TSG", logo: "\u{1F535}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "PreZero Arena", founded: 1899, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 186, name: "FC Heidenheim", shortName: "HDH", logo: "\u{1F534}\u{1F535}", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Voith-Arena", founded: 1946, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 178, name: "VfL Bochum", shortName: "BOC", logo: "\u{1F535}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Vonovia Ruhrstadion", founded: 1848, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 192, name: "Holstein Kiel", shortName: "KIE", logo: "\u{1F535}\u26AA", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Holstein-Stadion", founded: 1900, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 181, name: "FC St. Pauli", shortName: "STP", logo: "\u{1F3F4}\u200D\u2620\uFE0F", country: "Germany", league: "Bundesliga", leagueId: 78, venue: "Millerntor-Stadion", founded: 1910, trophies: { league: 0, cups: 0, europe: 0 } }
];
const ligue1Teams = [
  { id: 85, name: "Paris Saint-Germain", shortName: "PSG", logo: "\u{1F535}\u{1F534}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Parc des Princes", founded: 1970, trophies: { league: 12, cups: 14, europe: 0 } },
  { id: 91, name: "Monaco", shortName: "ASM", logo: "\u{1F534}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Louis II", founded: 1924, trophies: { league: 8, cups: 5, europe: 0 } },
  { id: 81, name: "Marseille", shortName: "OM", logo: "\u{1F535}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Orange V\xE9lodrome", founded: 1899, trophies: { league: 9, cups: 10, europe: 1 } },
  { id: 79, name: "Lille", shortName: "LIL", logo: "\u{1F534}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Pierre-Mauroy", founded: 1944, trophies: { league: 4, cups: 6, europe: 0 } },
  { id: 80, name: "Lyon", shortName: "LYO", logo: "\u{1F534}\u{1F535}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Groupama Stadium", founded: 1950, trophies: { league: 7, cups: 5, europe: 0 } },
  { id: 84, name: "Nice", shortName: "NIC", logo: "\u{1F534}\u26AB", country: "France", league: "Ligue 1", leagueId: 61, venue: "Allianz Riviera", founded: 1904, trophies: { league: 4, cups: 3, europe: 0 } },
  { id: 116, name: "Lens", shortName: "LEN", logo: "\u{1F534}\u{1F7E1}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Bollaert-Delelis", founded: 1906, trophies: { league: 1, cups: 0, europe: 0 } },
  { id: 94, name: "Rennes", shortName: "REN", logo: "\u{1F534}\u26AB", country: "France", league: "Ligue 1", leagueId: 61, venue: "Roazhon Park", founded: 1901, trophies: { league: 0, cups: 3, europe: 0 } },
  { id: 106, name: "Stade Brestois", shortName: "BRE", logo: "\u{1F534}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Francis-Le Bl\xE9", founded: 1950, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 95, name: "Strasbourg", shortName: "STR", logo: "\u{1F535}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade de la Meinau", founded: 1906, trophies: { league: 1, cups: 3, europe: 0 } },
  { id: 96, name: "Toulouse", shortName: "TLS", logo: "\u{1F49C}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stadium de Toulouse", founded: 1970, trophies: { league: 0, cups: 1, europe: 0 } },
  { id: 93, name: "Reims", shortName: "REI", logo: "\u{1F534}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Auguste-Delaune", founded: 1931, trophies: { league: 6, cups: 2, europe: 0 } },
  { id: 83, name: "Nantes", shortName: "NAN", logo: "\u{1F7E1}\u{1F7E2}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade de la Beaujoire", founded: 1943, trophies: { league: 8, cups: 3, europe: 0 } },
  { id: 99, name: "Auxerre", shortName: "AUX", logo: "\u{1F535}\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade de l'Abb\xE9-Deschamps", founded: 1905, trophies: { league: 1, cups: 4, europe: 0 } },
  { id: 77, name: "Angers", shortName: "ANG", logo: "\u26AB\u26AA", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Raymond Kopa", founded: 1919, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 108, name: "Le Havre", shortName: "HAV", logo: "\u{1F535}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Oc\xE9ane", founded: 1894, trophies: { league: 0, cups: 0, europe: 0 } },
  { id: 112, name: "Saint-Etienne", shortName: "STE", logo: "\u{1F7E2}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade Geoffroy-Guichard", founded: 1919, trophies: { league: 10, cups: 6, europe: 0 } },
  { id: 82, name: "Montpellier", shortName: "MTP", logo: "\u{1F535}\u{1F7E0}", country: "France", league: "Ligue 1", leagueId: 61, venue: "Stade de la Mosson", founded: 1974, trophies: { league: 1, cups: 2, europe: 0 } }
];
const championshipTeams = [
  { id: 41, name: "Southampton", shortName: "SOU", logo: "\u{1F534}\u26AA", country: "England", league: "Championship", leagueId: 40, venue: "St Mary's Stadium", founded: 1885, trophies: { league: 0, cups: 1, europe: 0 } },
  { id: 46, name: "Leicester City", shortName: "LEI", logo: "\u{1F98A}", country: "England", league: "Championship", leagueId: 40, venue: "King Power Stadium", founded: 1884, trophies: { league: 1, cups: 1, europe: 0 } },
  { id: 66, name: "Ipswich Town", shortName: "IPS", logo: "\u{1F535}", country: "England", league: "Championship", leagueId: 40, venue: "Portman Road", founded: 1878, trophies: { league: 1, cups: 1, europe: 1 } },
  { id: 71, name: "Sunderland", shortName: "SUN", logo: "\u{1F534}\u26AA", country: "England", league: "Championship", leagueId: 40, venue: "Stadium of Light", founded: 1879, trophies: { league: 6, cups: 2, europe: 0 } },
  { id: 68, name: "Middlesbrough", shortName: "MID", logo: "\u{1F534}", country: "England", league: "Championship", leagueId: 40, venue: "Riverside Stadium", founded: 1876, trophies: { league: 0, cups: 0, europe: 0 } }
];
const allTeams = [
  ...premierLeagueTeams,
  ...laLigaTeams,
  ...serieATeams,
  ...bundesligaTeams,
  ...ligue1Teams,
  ...championshipTeams
];
function getTeamsByLeague(leagueId) {
  return allTeams.filter((t) => t.leagueId === leagueId);
}
const teamStatsMap = /* @__PURE__ */ new Map();
const premierLeagueStandings = [
  // 1. Liverpool - Champions 2024/25 (82 pts)
  { id: 40, played: 6, wins: 5, draws: 1, losses: 0, goalsFor: 15, goalsAgainst: 4, cleanSheets: 4, form: ["W", "W", "D", "W", "W"] },
  // 2. Arsenal - 2nd 2024/25 (76 pts)
  { id: 42, played: 6, wins: 4, draws: 2, losses: 0, goalsFor: 12, goalsAgainst: 4, cleanSheets: 3, form: ["W", "D", "W", "W", "D"] },
  // 3. Manchester City - 6th 2024/25 but expected to bounce back
  { id: 50, played: 6, wins: 4, draws: 1, losses: 1, goalsFor: 14, goalsAgainst: 6, cleanSheets: 2, form: ["W", "W", "L", "W", "D"] },
  // 4. Nottingham Forest - 3rd 2024/25 (74 pts) - Breakout season
  { id: 63, played: 6, wins: 4, draws: 1, losses: 1, goalsFor: 10, goalsAgainst: 5, cleanSheets: 3, form: ["W", "D", "W", "L", "W"] },
  // 5. Chelsea - 4th 2024/25 (71 pts)
  { id: 49, played: 6, wins: 4, draws: 0, losses: 2, goalsFor: 13, goalsAgainst: 8, cleanSheets: 2, form: ["W", "W", "L", "W", "L"] },
  // 6. Newcastle - 5th 2024/25 (70 pts)
  { id: 34, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 10, goalsAgainst: 5, cleanSheets: 3, form: ["D", "W", "W", "D", "L"] },
  // 7. Bournemouth - 7th 2024/25 (65 pts) - Strong run continues
  { id: 35, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 9, goalsAgainst: 6, cleanSheets: 2, form: ["W", "D", "W", "L", "D"] },
  // 8. Aston Villa - 8th 2024/25 (64 pts)
  { id: 65, played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 11, goalsAgainst: 8, cleanSheets: 2, form: ["W", "L", "W", "D", "L"] },
  // 9. Fulham - 9th 2024/25 (60 pts)
  { id: 36, played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 8, goalsAgainst: 7, cleanSheets: 2, form: ["D", "W", "L", "W", "L"] },
  // 10. Brighton - 10th 2024/25 (56 pts)
  { id: 51, played: 6, wins: 2, draws: 3, losses: 1, goalsFor: 9, goalsAgainst: 7, cleanSheets: 1, form: ["D", "W", "D", "L", "D"] },
  // 11. Brentford - 11th 2024/25 (49 pts)
  { id: 55, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 10, goalsAgainst: 9, cleanSheets: 1, form: ["D", "L", "W", "D", "L"] },
  // 12. Crystal Palace - 12th 2024/25 (46 pts)
  { id: 52, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 7, goalsAgainst: 7, cleanSheets: 1, form: ["D", "L", "D", "W", "L"] },
  // 13. Manchester United - 13th 2024/25 (45 pts)
  { id: 33, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 7, goalsAgainst: 8, cleanSheets: 1, form: ["L", "D", "W", "L", "D"] },
  // 14. West Ham - 14th 2024/25 (44 pts)
  { id: 48, played: 6, wins: 2, draws: 1, losses: 3, goalsFor: 7, goalsAgainst: 10, cleanSheets: 1, form: ["L", "W", "L", "D", "L"] },
  // 15. Tottenham - 16th 2024/25 (39 pts) - Struggling
  { id: 47, played: 6, wins: 2, draws: 1, losses: 3, goalsFor: 9, goalsAgainst: 11, cleanSheets: 0, form: ["L", "W", "L", "L", "D"] },
  // 16. Everton - 15th 2024/25 (40 pts)
  { id: 45, played: 6, wins: 1, draws: 3, losses: 2, goalsFor: 5, goalsAgainst: 7, cleanSheets: 1, form: ["D", "L", "D", "W", "D"] },
  // 17. Wolves - 17th 2024/25 (38 pts)
  { id: 39, played: 6, wins: 1, draws: 2, losses: 3, goalsFor: 6, goalsAgainst: 10, cleanSheets: 0, form: ["L", "L", "D", "W", "D"] },
  // 18. Leeds United - PROMOTED (Champions 2024/25 Championship - 92 pts)
  { id: 66, played: 6, wins: 1, draws: 2, losses: 3, goalsFor: 6, goalsAgainst: 9, cleanSheets: 1, form: ["L", "D", "L", "W", "D"] },
  // 19. Sheffield United - PROMOTED (2nd 2024/25 Championship - 87 pts)
  { id: 62, played: 6, wins: 1, draws: 1, losses: 4, goalsFor: 4, goalsAgainst: 10, cleanSheets: 1, form: ["L", "D", "L", "L", "L"] },
  // 20. Burnley - PROMOTED (Playoff Winners 2024/25 Championship - 84 pts)
  { id: 44, played: 6, wins: 0, draws: 2, losses: 4, goalsFor: 4, goalsAgainst: 12, cleanSheets: 0, form: ["L", "L", "D", "L", "D"] }
];
const laLigaStandings = [
  // 1. Barcelona - Champions 2024/25 (87 pts)
  { id: 529, played: 6, wins: 5, draws: 1, losses: 0, goalsFor: 16, goalsAgainst: 4, cleanSheets: 4, form: ["W", "W", "D", "W", "W"] },
  // 2. Real Madrid - 2nd 2024/25 (83 pts)
  { id: 541, played: 6, wins: 5, draws: 0, losses: 1, goalsFor: 14, goalsAgainst: 5, cleanSheets: 3, form: ["W", "L", "W", "W", "W"] },
  // 3. Atletico Madrid - 3rd 2024/25 (78 pts)
  { id: 530, played: 6, wins: 4, draws: 2, losses: 0, goalsFor: 10, goalsAgainst: 4, cleanSheets: 3, form: ["W", "D", "W", "D", "W"] },
  // 4. Athletic Bilbao - 4th 2024/25 (71 pts)
  { id: 531, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 9, goalsAgainst: 5, cleanSheets: 2, form: ["W", "D", "L", "D", "W"] },
  // 5. Villarreal - 5th 2024/25 (66 pts)
  { id: 533, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 10, goalsAgainst: 7, cleanSheets: 2, form: ["D", "W", "W", "D", "L"] },
  // 6. Real Betis - 6th 2024/25 (60 pts)
  { id: 543, played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 8, goalsAgainst: 6, cleanSheets: 2, form: ["W", "L", "D", "W", "L"] },
  // 7. Real Sociedad - 7th 2024/25 (58 pts)
  { id: 548, played: 6, wins: 2, draws: 3, losses: 1, goalsFor: 7, goalsAgainst: 5, cleanSheets: 2, form: ["D", "D", "W", "L", "D"] },
  // 8. Mallorca - 8th 2024/25 (56 pts)
  { id: 798, played: 6, wins: 2, draws: 3, losses: 1, goalsFor: 6, goalsAgainst: 5, cleanSheets: 2, form: ["D", "W", "D", "D", "L"] },
  // 9. Osasuna - 9th 2024/25 (53 pts)
  { id: 727, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 7, goalsAgainst: 7, cleanSheets: 1, form: ["D", "L", "W", "D", "L"] },
  // 10. Sevilla - 11th 2024/25 (49 pts)
  { id: 536, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 8, goalsAgainst: 8, cleanSheets: 1, form: ["L", "D", "W", "L", "D"] },
  // 11. Girona - 10th 2024/25 (50 pts) - After incredible 2023/24
  { id: 547, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 9, goalsAgainst: 9, cleanSheets: 0, form: ["L", "W", "D", "L", "D"] },
  // 12. Celta Vigo - 12th 2024/25 (48 pts)
  { id: 538, played: 6, wins: 2, draws: 1, losses: 3, goalsFor: 7, goalsAgainst: 8, cleanSheets: 1, form: ["L", "D", "L", "W", "L"] },
  // 13. Rayo Vallecano - 13th 2024/25 (47 pts)
  { id: 728, played: 6, wins: 1, draws: 3, losses: 2, goalsFor: 5, goalsAgainst: 6, cleanSheets: 1, form: ["D", "D", "L", "D", "L"] },
  // 14. Getafe - 14th 2024/25 (44 pts)
  { id: 546, played: 6, wins: 1, draws: 3, losses: 2, goalsFor: 4, goalsAgainst: 6, cleanSheets: 2, form: ["D", "L", "D", "L", "D"] },
  // 15. Alaves - 15th 2024/25 (43 pts)
  { id: 542, played: 6, wins: 1, draws: 2, losses: 3, goalsFor: 5, goalsAgainst: 8, cleanSheets: 1, form: ["L", "D", "L", "D", "L"] },
  // 16. Espanyol - 16th 2024/25 (41 pts)
  { id: 540, played: 6, wins: 1, draws: 2, losses: 3, goalsFor: 4, goalsAgainst: 8, cleanSheets: 0, form: ["L", "L", "D", "D", "L"] },
  // 17. Leganes - 17th 2024/25 (38 pts) - Promoted
  { id: 745, played: 6, wins: 1, draws: 1, losses: 4, goalsFor: 4, goalsAgainst: 10, cleanSheets: 0, form: ["L", "L", "D", "L", "L"] },
  // 18. Las Palmas - 18th 2024/25 (survived) - Staying up
  { id: 534, played: 6, wins: 0, draws: 3, losses: 3, goalsFor: 4, goalsAgainst: 9, cleanSheets: 0, form: ["D", "L", "D", "L", "D"] }
  // Note: Valencia, Valladolid relegated in 2024/25
];
const serieAStandings = [
  // 1. Inter Milan - Champions 2024/25 (88 pts)
  { id: 505, played: 6, wins: 5, draws: 1, losses: 0, goalsFor: 14, goalsAgainst: 3, cleanSheets: 4, form: ["W", "W", "D", "W", "W"] },
  // 2. Napoli - 2nd 2024/25 (83 pts) with De Bruyne signing
  { id: 492, played: 6, wins: 4, draws: 2, losses: 0, goalsFor: 12, goalsAgainst: 4, cleanSheets: 3, form: ["W", "D", "W", "W", "D"] },
  // 3. Juventus - 4th 2024/25 (72 pts)
  { id: 496, played: 6, wins: 4, draws: 1, losses: 1, goalsFor: 10, goalsAgainst: 5, cleanSheets: 3, form: ["D", "W", "W", "L", "W"] },
  // 4. Atalanta - 3rd 2024/25 (76 pts)
  { id: 499, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 12, goalsAgainst: 7, cleanSheets: 2, form: ["W", "D", "L", "W", "D"] },
  // 5. AC Milan - 5th 2024/25 (67 pts)
  { id: 489, played: 6, wins: 3, draws: 2, losses: 1, goalsFor: 11, goalsAgainst: 7, cleanSheets: 2, form: ["D", "W", "D", "L", "W"] },
  // 6. Lazio - 6th 2024/25 (63 pts)
  { id: 498, played: 6, wins: 3, draws: 1, losses: 2, goalsFor: 10, goalsAgainst: 8, cleanSheets: 2, form: ["W", "L", "W", "L", "D"] },
  // 7. Roma - 7th 2024/25 (59 pts)
  { id: 497, played: 6, wins: 2, draws: 3, losses: 1, goalsFor: 8, goalsAgainst: 6, cleanSheets: 1, form: ["D", "D", "W", "D", "L"] },
  // 8. Fiorentina - 8th 2024/25 (57 pts)
  { id: 502, played: 6, wins: 2, draws: 3, losses: 1, goalsFor: 8, goalsAgainst: 7, cleanSheets: 1, form: ["D", "W", "D", "L", "D"] },
  // 9. Bologna - 9th 2024/25 (54 pts)
  { id: 500, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 7, goalsAgainst: 7, cleanSheets: 1, form: ["D", "L", "W", "D", "L"] },
  // 10. Torino - 10th 2024/25 (50 pts)
  { id: 503, played: 6, wins: 2, draws: 2, losses: 2, goalsFor: 6, goalsAgainst: 6, cleanSheets: 1, form: ["L", "D", "W", "D", "L"] }
];
const bundesligaStandings = [
  // 1. Bayern Munich - Champions 2024/25 (78 pts)
  { id: 157, played: 5, wins: 4, draws: 1, losses: 0, goalsFor: 16, goalsAgainst: 5, cleanSheets: 2, form: ["W", "W", "D", "W", "W"] },
  // 2. Bayer Leverkusen - 2nd 2024/25 (74 pts) after winning 2023/24
  { id: 168, played: 5, wins: 4, draws: 0, losses: 1, goalsFor: 13, goalsAgainst: 6, cleanSheets: 2, form: ["W", "L", "W", "W", "W"] },
  // 3. Borussia Dortmund - 3rd 2024/25 (65 pts)
  { id: 165, played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 12, goalsAgainst: 7, cleanSheets: 2, form: ["W", "D", "W", "L", "W"] },
  // 4. RB Leipzig - 4th 2024/25 (63 pts)
  { id: 173, played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 10, goalsAgainst: 6, cleanSheets: 2, form: ["D", "W", "L", "W", "W"] },
  // 5. Stuttgart - 9th 2024/25 after 2nd in 2023/24
  { id: 172, played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 11, goalsAgainst: 7, cleanSheets: 1, form: ["W", "W", "D", "L", "W"] },
  // 6. Frankfurt - 5th 2024/25 (59 pts)
  { id: 169, played: 5, wins: 2, draws: 2, losses: 1, goalsFor: 9, goalsAgainst: 6, cleanSheets: 1, form: ["D", "W", "D", "L", "W"] },
  // 7. Freiburg - 6th 2024/25 (55 pts)
  { id: 174, played: 5, wins: 2, draws: 2, losses: 1, goalsFor: 7, goalsAgainst: 5, cleanSheets: 2, form: ["D", "W", "L", "D", "W"] },
  // 8. Wolfsburg - 8th 2024/25 (50 pts)
  { id: 176, played: 5, wins: 2, draws: 2, losses: 1, goalsFor: 8, goalsAgainst: 6, cleanSheets: 1, form: ["D", "D", "W", "L", "W"] },
  // 9. Mainz 05 - 7th 2024/25 (51 pts)
  { id: 185, played: 5, wins: 2, draws: 1, losses: 2, goalsFor: 7, goalsAgainst: 7, cleanSheets: 1, form: ["W", "L", "D", "L", "W"] },
  // 10. Werder Bremen - 11th 2024/25 (44 pts)
  { id: 180, played: 5, wins: 2, draws: 1, losses: 2, goalsFor: 6, goalsAgainst: 6, cleanSheets: 1, form: ["L", "W", "D", "L", "W"] }
];
const ligue1Standings = [
  // 1. PSG - Champions 2024/25 (83 pts) Post-Mbappe era
  { id: 85, played: 5, wins: 5, draws: 0, losses: 0, goalsFor: 14, goalsAgainst: 3, cleanSheets: 3, form: ["W", "W", "W", "W", "W"] },
  // 2. Monaco - 3rd 2024/25 (67 pts)
  { id: 91, played: 5, wins: 3, draws: 2, losses: 0, goalsFor: 10, goalsAgainst: 4, cleanSheets: 2, form: ["D", "W", "D", "W", "W"] },
  // 3. Marseille - 2nd 2024/25 (71 pts)
  { id: 81, played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 9, goalsAgainst: 5, cleanSheets: 2, form: ["W", "L", "W", "D", "W"] },
  // 4. Lille - 4th 2024/25 (64 pts)
  { id: 79, played: 5, wins: 3, draws: 1, losses: 1, goalsFor: 8, goalsAgainst: 5, cleanSheets: 2, form: ["D", "W", "W", "L", "W"] },
  // 5. Lyon - 5th 2024/25 (60 pts)
  { id: 80, played: 5, wins: 3, draws: 0, losses: 2, goalsFor: 9, goalsAgainst: 7, cleanSheets: 1, form: ["L", "W", "W", "L", "W"] },
  // 6. Nice - 7th 2024/25 (53 pts)
  { id: 84, played: 5, wins: 2, draws: 2, losses: 1, goalsFor: 7, goalsAgainst: 5, cleanSheets: 1, form: ["D", "W", "D", "L", "W"] },
  // 7. Lens - 6th 2024/25 (56 pts)
  { id: 116, played: 5, wins: 2, draws: 2, losses: 1, goalsFor: 6, goalsAgainst: 5, cleanSheets: 1, form: ["D", "D", "W", "L", "W"] },
  // 8. Rennes - 8th 2024/25 (49 pts)
  { id: 94, played: 5, wins: 2, draws: 1, losses: 2, goalsFor: 7, goalsAgainst: 7, cleanSheets: 1, form: ["L", "W", "L", "D", "W"] },
  // 9. Brest - 12th 2024/25 after great 2023/24
  { id: 106, played: 5, wins: 1, draws: 3, losses: 1, goalsFor: 5, goalsAgainst: 5, cleanSheets: 1, form: ["D", "D", "L", "D", "W"] },
  // 10. Toulouse - 10th 2024/25 (45 pts)
  { id: 96, played: 5, wins: 1, draws: 2, losses: 2, goalsFor: 5, goalsAgainst: 6, cleanSheets: 1, form: ["L", "D", "L", "D", "W"] }
];
function standingToStats(standing, position) {
  const points = standing.wins * 3 + standing.draws;
  return {
    played: standing.played,
    wins: standing.wins,
    draws: standing.draws,
    losses: standing.losses,
    goalsFor: standing.goalsFor,
    goalsAgainst: standing.goalsAgainst,
    cleanSheets: standing.cleanSheets,
    form: standing.form,
    homeWins: Math.ceil(standing.wins * 0.6),
    homePlayed: Math.ceil(standing.played / 2),
    awayWins: Math.floor(standing.wins * 0.4),
    awayPlayed: Math.floor(standing.played / 2),
    avgGoalsScored: Math.round(standing.goalsFor / standing.played * 100) / 100,
    avgGoalsConceded: Math.round(standing.goalsAgainst / standing.played * 100) / 100,
    points,
    position
  };
}
premierLeagueStandings.forEach((s, idx) => teamStatsMap.set(s.id, standingToStats(s, idx + 1)));
laLigaStandings.forEach((s, idx) => teamStatsMap.set(s.id, standingToStats(s, idx + 1)));
serieAStandings.forEach((s, idx) => teamStatsMap.set(s.id, standingToStats(s, idx + 1)));
bundesligaStandings.forEach((s, idx) => teamStatsMap.set(s.id, standingToStats(s, idx + 1)));
ligue1Standings.forEach((s, idx) => teamStatsMap.set(s.id, standingToStats(s, idx + 1)));
function generateTeamStats(position, totalTeams = 20) {
  const quality = 1 - (position - 1) / totalTeams;
  const played = 6;
  const baseWinRate = 0.15 + quality * 0.5;
  const wins = Math.floor(played * baseWinRate);
  const losses = Math.floor(played * (1 - baseWinRate) * 0.5);
  const draws = played - wins - losses;
  const avgGoalsScored = 0.8 + quality * 1.4;
  const avgGoalsConceded = 1.6 - quality * 0.8;
  const goalsFor = Math.floor(avgGoalsScored * played);
  const goalsAgainst = Math.floor(avgGoalsConceded * played);
  const form = [];
  for (let i = 0; i < 5; i++) {
    const rand = Math.random();
    if (rand < baseWinRate) form.push("W");
    else if (rand < baseWinRate + 0.25) form.push("D");
    else form.push("L");
  }
  return {
    played,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    cleanSheets: Math.floor(played * (0.1 + quality * 0.25)),
    form,
    homeWins: Math.floor(wins * 0.6),
    homePlayed: Math.floor(played / 2),
    awayWins: wins - Math.floor(wins * 0.6),
    awayPlayed: played - Math.floor(played / 2),
    avgGoalsScored: Math.round(avgGoalsScored * 100) / 100,
    avgGoalsConceded: Math.round(avgGoalsConceded * 100) / 100,
    points: wins * 3 + draws,
    position
  };
}
[520, 511, 514, 515, 523, 504, 867, 522, 517, 1579].forEach((id, idx) => {
  if (!teamStatsMap.has(id)) {
    teamStatsMap.set(id, generateTeamStats(11 + idx, 20));
  }
});
[184, 175, 170, 182, 186, 178, 192, 181].forEach((id, idx) => {
  if (!teamStatsMap.has(id)) {
    teamStatsMap.set(id, generateTeamStats(11 + idx, 18));
  }
});
[95, 93, 83, 99, 77, 108, 112, 82].forEach((id, idx) => {
  if (!teamStatsMap.has(id)) {
    teamStatsMap.set(id, generateTeamStats(11 + idx, 18));
  }
});
[41, 46, 71, 68].forEach((id, idx) => {
  if (!teamStatsMap.has(id)) {
    teamStatsMap.set(id, generateTeamStats(idx + 1, 24));
  }
});
function getTeamStats(teamId) {
  return teamStatsMap.get(teamId);
}
export {
  allTeams,
  bundesligaTeams,
  championshipTeams,
  getTeamStats,
  getTeamsByLeague,
  laLigaTeams,
  leagues,
  ligue1Teams,
  premierLeagueTeams,
  serieATeams,
  teamStatsMap
};
