type team = {id: float, name: string, shortName: string, logo: string, league: string, leagueId: float}
type league = {id: float, name: string, flag: string}
type selectTarget = {value: string}

@get external target: ReactEvent.Form.t => selectTarget = "target"
@get external value: selectTarget => string = "value"
@val external parseId: string => float = "parseInt"

let preview = (team, colorClass) =>
  <div className={"mt-2 flex items-center gap-2 rounded-lg p-2 border " ++ colorClass}>
    <span className="text-2xl">{React.string(team.logo)}</span>
    <div><span className="text-white font-medium">{React.string(team.name)}</span><span className="text-slate-400 text-xs block">{React.string(team.league)}</span></div>
  </div>

let teamOptions = (teams: array<team>, excluded: Nullable.t<float>) =>
  React.array(Belt.Array.mapWithIndex(teams, (index, team) =>
    if Nullable.isNullable(excluded) || team.id != Nullable.getOrThrow(excluded) {
      <option key={Int.toString(index)} value={Float.toString(team.id)}>{React.string(team.logo ++ " " ++ team.name)}</option>
    } else {
      React.null
    }
  ))

let leagueOptions = (leagues: array<league>, teams: array<team>, excluded: Nullable.t<float>) =>
  React.array(Belt.Array.mapWithIndex(leagues, (index, league) => {
    let teamsForLeague = teams->Array.filter(team => team.leagueId == league.id)
    <optgroup key={Int.toString(index)} label={league.flag ++ " " ++ league.name}>{teamOptions(teamsForLeague, excluded)}</optgroup>
  }))

@react.component
let make = (
  ~allTeams: array<team>, ~leagues: array<league>,
  ~selectedHome: Nullable.t<team>, ~selectedAway: Nullable.t<team>,
  ~onSelectHome: team => unit, ~onSelectAway: team => unit,
) => {
  let selectedHomeId = if Nullable.isNullable(selectedHome) {Nullable.null} else {Nullable.make(Nullable.getOrThrow(selectedHome).id)}
  let selectedAwayId = if Nullable.isNullable(selectedAway) {Nullable.null} else {Nullable.make(Nullable.getOrThrow(selectedAway).id)}
  let homeId = if Nullable.isNullable(selectedHome) {""} else {Float.toString(Nullable.getOrThrow(selectedHome).id)}
  let awayId = if Nullable.isNullable(selectedAway) {""} else {Float.toString(Nullable.getOrThrow(selectedAway).id)}
  let homeChange = event => {
    let id = parseId(value(target(event)))
    switch allTeams->Array.find(team => team.id == id) {
    | Some(team) => onSelectHome(team)
    | None => ()
    }
  }
  let awayChange = event => {
    let id = parseId(value(target(event)))
    switch allTeams->Array.find(team => team.id == id) {
    | Some(team) => onSelectAway(team)
    | None => ()
    }
  }
  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">{React.string("🔄 Custom Match Analysis")}</h2>
    <p className="text-slate-400 text-sm mb-4">{React.string("Select any two teams from major European leagues to compare")}</p>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-blue-400 text-sm font-medium mb-2">{React.string("🏠 Home Team")}</label>
        <div className="relative">
          <select value={homeId} onChange={homeChange} className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none appearance-none cursor-pointer">
            <option value="">{React.string("Select home team...")}</option>
            {leagueOptions(leagues, allTeams, selectedAwayId)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
        </div>
        {switch Nullable.toOption(selectedHome) { | Some(team) => preview(team, "bg-blue-500/20 border-blue-500/30") | None => React.null}}
      </div>
      <div>
        <label className="block text-red-400 text-sm font-medium mb-2">{React.string("✈️ Away Team")}</label>
        <div className="relative">
          <select value={awayId} onChange={awayChange} className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 border border-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none appearance-none cursor-pointer">
            <option value="">{React.string("Select away team...")}</option>
            {leagueOptions(leagues, allTeams, selectedHomeId)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></div>
        </div>
        {switch Nullable.toOption(selectedAway) { | Some(team) => preview(team, "bg-red-500/20 border-red-500/30") | None => React.null}}
      </div>
    </div>
    {switch (Nullable.toOption(selectedHome), Nullable.toOption(selectedAway)) {
    | (Some(homeTeam), Some(awayTeam)) =>
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-xl px-6 py-3 border border-slate-600">
          <div className="flex items-center gap-2"><span className="text-2xl">{React.string(homeTeam.logo)}</span><span className="text-white font-bold">{React.string(homeTeam.shortName)}</span></div>
          <span className="text-slate-400 text-lg font-bold">{React.string("vs")}</span>
          <div className="flex items-center gap-2"><span className="text-white font-bold">{React.string(awayTeam.shortName)}</span><span className="text-2xl">{React.string(awayTeam.logo)}</span></div>
        </div>
        <p className="text-slate-500 text-xs mt-2">{React.string(if homeTeam.league == awayTeam.league {homeTeam.league ++ " match"} else {"Cross-league comparison"})}</p>
      </div>
    | _ => React.null
    }}
    <div className="mt-4 p-3 bg-slate-700/30 rounded-lg text-xs text-slate-400"><p>{React.string("📊 Available: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Championship")}</p><p className="mt-1">{React.string("🔄 Includes 2025/26 promotions & relegations")}</p></div>
  </div>
}
