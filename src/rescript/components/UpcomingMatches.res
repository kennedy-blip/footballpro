type team = {name: string, logo: string}
type match = {
  id: float, leagueId: float, league: string, date: string, time: string,
  homeTeam: team, awayTeam: team,
  matchweek: Nullable.t<float>, venue: Nullable.t<string>, tvChannel: Nullable.t<string>,
}
type league = {id: float, name: string, flag: string}

let formatDate = date => Date.toLocaleDateStringWithLocaleAndOptions(Date.fromString(date), "en-GB", {weekday: #short, month: #short, day: #numeric})
let hasValue = value => !Nullable.isNullable(value)
let selectedButton = active => "px-3 py-1 rounded-lg text-xs font-medium transition-all " ++ (if active {"bg-emerald-600 text-white"} else {"bg-slate-700 text-slate-300 hover:bg-slate-600"})

@react.component
let make = (~matches: array<match>, ~leagues: array<league>, ~onSelectMatch: match => unit, ~selectedMatchId: Nullable.t<float>) => {
  let (filterLeague, setFilterLeague) = React.useState(() => Nullable.null)
  let filteredMatches = if Nullable.isNullable(filterLeague) {
    matches
  } else {
    let selected = Nullable.getOrThrow(filterLeague)
    matches->Array.filter(match => match.leagueId == selected)
  }
  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">{React.string("📅 2025/26 Season Fixtures")}</h2>
    <p className="text-slate-400 text-sm mb-4">{React.string("Scheduled matches • Click to analyze")}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={_ => setFilterLeague(_ => Nullable.null)} className={selectedButton(Nullable.isNullable(filterLeague))}>{React.string("All")}</button>
      {React.array(Belt.Array.mapWithIndex(Belt.Array.slice(leagues, ~offset=0, ~len=5), (index, league) => {
        let active = !Nullable.isNullable(filterLeague) && Nullable.getOrThrow(filterLeague) == league.id
        let shortName = String.split(league.name, " ")->Array.getUnsafe(0)
        <button key={Int.toString(index)} onClick={_ => setFilterLeague(_ => Nullable.make(league.id))} className={selectedButton(active)}>{React.string(league.flag ++ " " ++ shortName)}</button>
      }))}
    </div>
    <div className="space-y-3 max-h-[500px] overflow-y-auto">
      {if Array.length(filteredMatches) == 0 {
        <div className="text-center py-8"><p className="text-slate-400">{React.string("No fixtures found for this league")}</p></div>
      } else {
        React.array(Belt.Array.mapWithIndex(filteredMatches, (index, match) => {
          let selected = !Nullable.isNullable(selectedMatchId) && Nullable.getOrThrow(selectedMatchId) == match.id
          let matchClass = "w-full p-4 rounded-xl transition-all duration-200 border " ++ (if selected {"bg-emerald-600/30 border-emerald-500 ring-2 ring-emerald-500"} else {"bg-slate-700/50 hover:bg-slate-700 border-slate-600"})
          <button key={Int.toString(index)} onClick={_ => onSelectMatch(match)} className={matchClass}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><span className="text-xs text-emerald-400 font-medium">{React.string(match.league)}</span>{if hasValue(match.matchweek) {<span className="text-xs bg-slate-600 px-2 py-0.5 rounded text-slate-300">{React.string("MW " ++ Float.toString(Nullable.getOrThrow(match.matchweek)))}</span>} else {React.null}}</div>
              <div className="text-right"><span className="text-xs text-slate-400">{React.string(formatDate(match.date))}</span><span className="text-xs text-slate-500 ml-2">{React.string(match.time)}</span></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1"><span className="text-xl">{React.string(match.homeTeam.logo)}</span><span className="text-white font-medium text-sm">{React.string(match.homeTeam.name)}</span></div>
              <span className="text-slate-500 text-sm px-3">{React.string("vs")}</span>
              <div className="flex items-center gap-2 flex-1 justify-end"><span className="text-white font-medium text-sm">{React.string(match.awayTeam.name)}</span><span className="text-xl">{React.string(match.awayTeam.logo)}</span></div>
            </div>
            {if hasValue(match.venue) {<div className="mt-2 text-xs text-slate-500 text-left">{React.string("📍 " ++ Nullable.getOrThrow(match.venue))}</div>} else {React.null}}
            {if hasValue(match.tvChannel) {<div className="mt-1 text-xs text-blue-400 text-left">{React.string("📺 " ++ Nullable.getOrThrow(match.tvChannel))}</div>} else {React.null}}
          </button>
        }))
      }}</div>
    <div className="mt-4 p-3 bg-slate-700/30 rounded-lg"><p className="text-slate-400 text-xs">{React.string("⏰ All times shown in local venue time. Season starts August 15, 2025.")}</p></div>
  </div>
}
