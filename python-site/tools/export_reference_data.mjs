// One-time migration utility: extracts checked-in reference data into portable JSON.
// It does not ship in the published site and does not alter the reference source.
let seed = 0x6d2b79f5;
Math.random = () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
const leaguesModule = await import("../../src/data/leagues.js");
const fixturesModule = await import("../../src/data/fixtures.js");
const stats = Object.fromEntries(leaguesModule.teamStatsMap.entries());
const players = Object.fromEntries(fixturesModule.playersMap.entries());
const h2h = {
  "42-49": fixturesModule.getHeadToHead(42, 49),
  "40-50": fixturesModule.getHeadToHead(40, 50),
  "541-529": fixturesModule.getHeadToHead(541, 529),
};
const dataset = {
  leagues: leaguesModule.leagues,
  teams: leaguesModule.allTeams,
  stats,
  fixtures: fixturesModule.upcomingMatches,
  liveMatches: fixturesModule.liveMatches,
  players,
  h2h,
};
const destination = new URL("../content/site-data.json", import.meta.url);
await (await import("node:fs/promises")).writeFile(destination, JSON.stringify(dataset, null, 2) + "\n");
console.log(`Exported ${dataset.teams.length} teams, ${dataset.fixtures.length} fixtures, ${Object.keys(stats).length} stat rows`);
