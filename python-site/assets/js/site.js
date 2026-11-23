const app = document.querySelector("#app");
const state = { data: null, tab: "fixtures", leagueId: 39, fixtureLeague: "all", selectedFixture: null, homeId: "", awayId: "" };
const el = (tag, className = "", text = "") => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
};
const findTeam = id => state.data.teams.find(team => team.id === Number(id));
const getStats = id => state.data.stats[String(id)] ?? null;
const pct = value => `${Math.round(value * 100)}%`;

function button(text, className, callback) {
  const node = el("button", className, text);
  node.type = "button";
  node.addEventListener("click", callback);
  return node;
}
function tabChanged(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab").forEach(item => item.classList.toggle("active", item.dataset.tab === tab));
  if (tab !== "fixtures") state.selectedFixture = null;
  render();
}
document.querySelectorAll(".tab").forEach(item => item.addEventListener("click", () => tabChanged(item.dataset.tab)));

function getH2H(homeId, awayId) {
  const direct = state.data.h2h[`${homeId}-${awayId}`];
  if (direct) return direct;
  const reverse = state.data.h2h[`${awayId}-${homeId}`];
  if (reverse) return { ...reverse, homeTeamWins: reverse.awayTeamWins, awayTeamWins: reverse.homeTeamWins, homeTeamGoals: reverse.awayTeamGoals, awayTeamGoals: reverse.homeTeamGoals };
  const h = getStats(homeId), a = getStats(awayId);
  const hp = h?.position ?? 10, ap = a?.position ?? 10;
  const n = 24;
  const homeRate = Math.max(.2, Math.min(.6, .55 + (ap - hp) * .02));
  const awayRate = Math.max(.2, Math.min(.5, .35 + (hp - ap) * .02));
  const hw = Math.round(n * homeRate), aw = Math.round(n * awayRate), draws = n - hw - aw;
  return { homeTeamWins: hw, awayTeamWins: aw, draws, totalMatches: n, avgGoals: 2.6, homeTeamGoals: hw * 2 + draws, awayTeamGoals: aw * 2 + draws, recentMatches: [] };
}
function formPoints(form = []) { return form.reduce((sum, value) => sum + (value === "W" ? 3 : value === "D" ? 1 : 0), 0); }
function calculatePrediction(h, a, h2h) {
  const homeWinRate = h.wins / h.played, awayWinRate = a.wins / a.played;
  const homeAtk = h.avgGoalsScored / 1.5, awayAtk = a.avgGoalsScored / 1.5;
  const homeDef = 1.5 / Math.max(.5, h.avgGoalsConceded), awayDef = 1.5 / Math.max(.5, a.avgGoalsConceded);
  const homeRate = h.homePlayed > 0 ? h.homeWins / h.homePlayed : .5;
  const awayRate = a.awayPlayed > 0 ? a.awayWins / a.awayPlayed : .3;
  let home = homeWinRate * .2 + formPoints(h.form) / 15 * .2 + homeAtk * .1 + homeDef * .08 + h2h.homeTeamWins / h2h.totalMatches * .12 + .12 + homeRate * .18;
  let away = awayWinRate * .2 + formPoints(a.form) / 15 * .2 + awayAtk * .1 + awayDef * .08 + h2h.awayTeamWins / h2h.totalMatches * .12 + awayRate * .18;
  const total = home + away;
  home = home / total * .74; away = away / total * .74;
  let draw = .26;
  if (Math.abs(homeWinRate - awayWinRate) < .1) { home -= .04; away -= .04; draw += .08; }
  const hg = (h.avgGoalsScored * homeAtk + a.avgGoalsConceded / awayDef) / 2;
  const ag = (a.avgGoalsScored * awayAtk + h.avgGoalsConceded / homeDef) / 2;
  const totalGoals = hg + ag;
  const over15 = Math.min(.92, Math.max(.25, .5 + (totalGoals - 1.5) * .18));
  const over25 = Math.min(.85, Math.max(.15, .35 + (totalGoals - 2.5) * .20 + (h2h.avgGoals - 2.5) * .08));
  const over35 = Math.min(.70, Math.max(.10, .20 + (totalGoals - 3.5) * .18));
  const btts = Math.min(.85, Math.max(.20, 1 - (h.cleanSheets / h.played + a.cleanSheets / a.played) / 2));
  let recommendation = home > away && home > draw ? (home > .48 ? "Strong bet on HOME WIN. The home team shows superior form and has a significant advantage at their ground." : "Slight edge to HOME WIN, but consider Double Chance (1X) for safer play.") : away > home && away > draw ? (away > .42 ? "Consider AWAY WIN. The away team's recent form and stats suggest they can win on the road." : "Away team has an edge, but Double Chance (X2) recommended for safety.") : "Match looks evenly contested. Consider DRAW or Double Chance bets for lower risk.";
  if (over25 > .60) recommendation += ` OVER 2.5 goals looks promising (${Math.round(over25 * 100)}% probability).`;
  else if (1 - over25 > .60) recommendation += ` UNDER 2.5 goals recommended (${Math.round((1 - over25) * 100)}% probability).`;
  if (btts > .65) recommendation += " Both teams likely to score.";
  const max = Math.max(home, draw, away);
  return { home: +home.toFixed(2), draw: +draw.toFixed(2), away: +away.toFixed(2), over15: +over15.toFixed(2), over25: +over25.toFixed(2), over35: +over35.toFixed(2), btts: +btts.toFixed(2), homeGoals: Math.round(hg), awayGoals: Math.round(ag), confidence: max > .52 && h.played >= 10 && a.played >= 10 ? "high" : max > .38 ? "medium" : "low", recommendation };
}
function createTeamSelect(label, value, onChange) {
  const wrap = el("label", "select-label", label);
  const select = el("select", "team-select");
  const placeholder = el("option", "", "Choose a team"); placeholder.value = ""; select.append(placeholder);
  for (const league of state.data.leagues) {
    const group = document.createElement("optgroup"); group.label = `${league.flag} ${league.name}`;
    for (const team of state.data.teams.filter(item => item.leagueId === league.id)) {
      const option = el("option", "", `${team.logo} ${team.name}`); option.value = team.id;
      if (String(value) === String(team.id)) option.selected = true;
      group.append(option);
    }
    select.append(group);
  }
  select.addEventListener("change", event => onChange(event.target.value)); wrap.append(select); return wrap;
}
function renderFixtures(root) {
  const grid = el("div", "app-grid"), sidebar = el("section", "panel fixture-panel"), content = el("section", "analysis-area");
  sidebar.append(el("h2", "panel-title", "Live Matches"));
  const live = state.data.liveMatches;
  sidebar.append(el("p", "muted", live.length ? `${live.length} live match(es)` : "No matches currently live"));
  sidebar.append(el("h2", "panel-title", "Upcoming Fixtures"));
  const filters = el("div", "filter-row");
  filters.append(button("All", state.fixtureLeague === "all" ? "filter active" : "filter", () => { state.fixtureLeague = "all"; render(); }));
  for (const league of state.data.leagues.filter(item => item.id !== 40)) filters.append(button(`${league.flag} ${league.name}`, state.fixtureLeague === String(league.id) ? "filter active" : "filter", () => { state.fixtureLeague = String(league.id); render(); }));
  sidebar.append(filters);
  const list = el("div", "fixture-list");
  const fixtures = state.data.fixtures.filter(match => state.fixtureLeague === "all" || String(match.leagueId) === state.fixtureLeague);
  for (const match of fixtures) {
    const card = button("", `fixture-card ${state.selectedFixture?.id === match.id ? "selected" : ""}`, () => { state.selectedFixture = match; render(); });
    card.append(el("span", "fixture-meta", `${match.league} · MW ${match.matchweek ?? "—"} · ${match.date} ${match.time}`));
    card.append(el("strong", "fixture-teams", `${match.homeTeam.logo} ${match.homeTeam.name} — ${match.awayTeam.name} ${match.awayTeam.logo}`));
    if (match.venue) card.append(el("span", "fixture-meta", `📍 ${match.venue}`));
    list.append(card);
  }
  sidebar.append(list);
  if (state.selectedFixture) {
    const match = state.selectedFixture;
    renderAnalysis(content, match.homeTeam, match.awayTeam, match);
  } else content.append(el("div", "empty-state", "Select a match to see predictions and team analysis."));
  grid.append(sidebar, content); root.append(grid);
}
function renderCustom(root) {
  const section = el("section", "panel custom-panel"); section.append(el("h2", "panel-title", "Custom Team Analysis"));
  const controls = el("div", "team-pickers");
  controls.append(createTeamSelect("Home team", state.homeId, value => { state.homeId = value; render(); }));
  controls.append(createTeamSelect("Away team", state.awayId, value => { state.awayId = value; render(); })); section.append(controls);
  const content = el("section", "analysis-area");
  const home = findTeam(state.homeId), away = findTeam(state.awayId);
  if (home && away) renderAnalysis(content, home, away);
  else content.append(el("div", "empty-state", "Choose two teams to compare their statistics and generate a prediction."));
  section.append(content); root.append(section);
}
function renderStandings(root) {
  const section = el("section", "panel standings-panel"); section.append(el("h2", "panel-title", "League Tables"));
  const selector = el("div", "filter-row");
  for (const league of state.data.leagues) selector.append(button(`${league.flag} ${league.name}`, state.leagueId === league.id ? "filter active" : "filter", () => { state.leagueId = league.id; render(); }));
  section.append(selector);
  const rows = state.data.teams.filter(team => team.leagueId === state.leagueId).map(team => ({team, stats: getStats(team.id)})).filter(row => row.stats).sort((a,b) => b.stats.points-a.stats.points || (b.stats.goalsFor-b.stats.goalsAgainst)-(a.stats.goalsFor-a.stats.goalsAgainst));
  const table = el("div", "table-scroll"), tbl = document.createElement("table"); tbl.className = "standings";
  const thead = document.createElement("thead"), hr = document.createElement("tr");
  for (const title of ["#", "Club", "P", "W", "D", "L", "GD", "Pts"]) hr.append(el("th", "", title)); thead.append(hr); tbl.append(thead);
  const tbody = document.createElement("tbody"); const count = rows.length;
  rows.forEach(({team,stats}, index) => {
    const tr = document.createElement("tr"); if (index < 4) tr.className = "zone-champions"; if (index >= count - 3) tr.classList.add("zone-relegation");
    for (const val of [index+1, `${team.logo} ${team.name}`, stats.played, stats.wins, stats.draws, stats.losses, stats.goalsFor-stats.goalsAgainst, stats.points]) tr.append(el(index === 1 ? "th" : "td", "", val)); tbody.append(tr);
  });
  tbl.append(tbody); table.append(tbl); section.append(table);
  const legend = el("p", "legend", "🟦 Champions League qualification · 🟥 Relegation zone (league projections)"); section.append(legend); root.append(section);
}
function renderAnalysis(root, home, away, match = null) {
  root.append(el("div", "match-heading", `${home.logo} ${home.name}  VS  ${away.logo} ${away.name}`));
  if (match) root.append(el("p", "muted match-detail", `${match.league} · ${match.date} · ${match.time}${match.venue ? ` · ${match.venue}` : ""}`));
  const h = getStats(home.id), a = getStats(away.id);
  if (!h || !a) { root.append(el("p", "notice", "Team statistics are not available for this pairing yet.")); return; }
  const prediction = calculatePrediction(h, a, getH2H(home.id, away.id));
  const card = el("article", "panel prediction-card"); card.append(el("div", "prediction-head", `Prediction · ${prediction.confidence} confidence`));
  const probs = el("div", "probabilities");
  for (const [name, value] of [["Home win",prediction.home],["Draw",prediction.draw],["Away win",prediction.away]]) { const item=el("div","probability"); item.append(el("span","muted",name),el("strong","",pct(value))); const meter=el("div","meter"); const fill=el("i"); fill.style.width=pct(value); meter.append(fill); item.append(meter); probs.append(item); }
  card.append(probs, el("p", "scoreline", `Projected score ${prediction.homeGoals} – ${prediction.awayGoals}`), el("p", "recommendation", prediction.recommendation));
  const markets=el("div","market-grid"); for (const [name,value] of [["Over 1.5",prediction.over15],["Over 2.5",prediction.over25],["Over 3.5",prediction.over35],["Both teams score",prediction.btts]]) markets.append(el("div","market",`${name}: ${pct(value)}`)); card.append(markets); root.append(card);
  const compare=el("article","panel stats-card"); compare.append(el("h3","panel-title","Team Statistics"));
  for (const [label,hv,av] of [["Played",h.played,a.played],["Wins",h.wins,a.wins],["Draws",h.draws,a.draws],["Goals scored",h.goalsFor,a.goalsFor],["Goals conceded",h.goalsAgainst,a.goalsAgainst],["Points",h.points,a.points],["Avg goals scored",h.avgGoalsScored,a.avgGoalsScored],["Avg goals conceded",h.avgGoalsConceded,a.avgGoalsConceded]]) {const row=el("div","stat-row");row.append(el("strong","",hv),el("span","muted",label),el("strong","",av));compare.append(row);}
  compare.append(el("p","form-line",`${home.shortName} form: ${(h.form||[]).join(" ")} · ${away.shortName} form: ${(a.form||[]).join(" ")}`));root.append(compare);
  const history = getH2H(home.id, away.id);
  const h2hCard = el("article", "panel h2h-card");
  h2hCard.append(el("h3", "panel-title", "Head-to-Head"));
  h2hCard.append(el("p", "muted", `${history.totalMatches} historical matches · ${history.avgGoals} average goals`));
  h2hCard.append(el("p", "h2h-summary", `${home.name}: ${history.homeTeamWins} wins · Draws: ${history.draws} · ${away.name}: ${history.awayTeamWins} wins`));
  if (history.recentMatches?.length) {
    const recent = el("ul", "recent-results");
    for (const match of history.recentMatches.slice(0, 5)) recent.append(el("li", "", `${match.date} · ${match.homeTeam} ${match.homeScore}–${match.awayScore} ${match.awayTeam} · ${match.competition}`));
    h2hCard.append(recent);
  }
  root.append(h2hCard);
  const players=el("article","panel players-card"); players.append(el("h3","panel-title","Featured Players"));
  for (const team of [home,away]) { players.append(el("h4","player-team",`${team.logo} ${team.name}`)); const entries=(state.data.players[String(team.id)]||[]).slice(0,5); if (!entries.length) players.append(el("p","muted","Player details are not available.")); for(const p of entries) players.append(el("p","player-line",`${p.name} · ${p.position} · ${p.goals} goals · ${p.assists} assists`)); }
  root.append(players);
}
function render() {
  if (!state.data) return;
  const root = el("div", "app-content");
  if (state.tab === "fixtures") renderFixtures(root);
  else if (state.tab === "custom") renderCustom(root);
  else renderStandings(root);
  app.replaceChildren(root);
}
fetch(app.dataset.siteData).then(response => { if (!response.ok) throw new Error("Failed to load local match data"); return response.json(); }).then(data => { state.data=data; render(); }).catch(error => { app.replaceChildren(el("p","notice",`Could not load site data: ${error.message}`)); });
