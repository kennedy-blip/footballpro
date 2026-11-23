type team = {shortName: string}
type recentMatch = {
  date: string, season: string, homeTeam: string, awayTeam: string,
  homeScore: float, awayScore: float,
}
type headToHead = {
  homeTeamWins: float, awayTeamWins: float, draws: float, totalMatches: float,
  avgGoals: float, recentMatches: array<recentMatch>,
}

let width = value => ReactDOM.Style.unsafeAddProp({}, "width", Float.toString(value) ++ "%")
let number = value => React.string(Float.toString(value))
let recentName = name => if String.length(name) > 12 {String.slice(name, ~start=0, ~end=12) ++ "..."} else {name}

@react.component
let make = (~h2h: headToHead, ~homeTeam: team, ~awayTeam: team) => {
  let homePercentage = h2h.homeTeamWins /. h2h.totalMatches *. 100.
  let drawPercentage = h2h.draws /. h2h.totalMatches *. 100.
  let awayPercentage = h2h.awayTeamWins /. h2h.totalMatches *. 100.
  let insight = if h2h.homeTeamWins > h2h.awayTeamWins {
    homeTeam.shortName ++ " has the historical edge with " ++ Float.toString(h2h.homeTeamWins) ++ " wins in " ++ Float.toString(h2h.totalMatches) ++ " meetings"
  } else if h2h.awayTeamWins > h2h.homeTeamWins {
    awayTeam.shortName ++ " leads the head-to-head with " ++ Float.toString(h2h.awayTeamWins) ++ " wins historically"
  } else {
    "Evenly matched fixture with " ++ Float.toString(h2h.draws) ++ " draws from " ++ Float.toString(h2h.totalMatches) ++ " meetings"
  }
  let insight = if h2h.avgGoals > 2.5 {insight ++ ". This fixture tends to produce goals (avg " ++ Float.toFixed(~digits=1, h2h.avgGoals) ++ " per game)."} else {insight}
  let insight = if h2h.avgGoals < 2.0 {insight ++ ". Typically a low-scoring fixture (avg " ++ Float.toFixed(~digits=1, h2h.avgGoals) ++ " per game)."} else {insight}
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
    <h3 className="text-white font-bold mb-4 flex items-center gap-2">{React.string("⚔️ Head to Head History")}</h3>
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1"><span className="text-blue-400">{React.string(homeTeam.shortName)}</span><span className="text-slate-400">{React.string("Draws")}</span><span className="text-red-400">{React.string(awayTeam.shortName)}</span></div>
      <div className="flex h-4 rounded-full overflow-hidden">
        <div className="bg-blue-500 transition-all duration-500" style={width(homePercentage)} />
        <div className="bg-slate-500 transition-all duration-500" style={width(drawPercentage)} />
        <div className="bg-red-500 transition-all duration-500" style={width(awayPercentage)} />
      </div>
      <div className="flex justify-between text-sm mt-1"><span className="text-white font-bold">{number(h2h.homeTeamWins)}</span><span className="text-slate-400">{number(h2h.draws)}</span><span className="text-white font-bold">{number(h2h.awayTeamWins)}</span></div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="p-3 bg-slate-700/50 rounded-lg text-center"><span className="text-slate-400 text-xs">{React.string("Total Matches")}</span><div className="text-white font-bold text-lg">{number(h2h.totalMatches)}</div></div>
      <div className="p-3 bg-slate-700/50 rounded-lg text-center"><span className="text-slate-400 text-xs">{React.string("Avg Goals/Match")}</span><div className="text-emerald-400 font-bold text-lg">{React.string(Float.toFixed(~digits=1, h2h.avgGoals))}</div></div>
    </div>
    <h4 className="text-slate-300 text-sm font-medium mb-2">{React.string("Recent Meetings")}</h4>
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {React.array(Belt.Array.mapWithIndex(h2h.recentMatches, (index, match) =>
        <div key={Int.toString(index)} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2 text-sm">
          <div className="flex flex-col"><span className="text-slate-400 text-xs">{React.string(match.date)}</span><span className="text-slate-500 text-xs">{React.string(match.season)}</span></div>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className={"font-medium text-xs " ++ (if match.homeScore > match.awayScore {"text-green-400"} else {"text-slate-300"})}>{React.string(recentName(match.homeTeam))}</span>
            <span className="text-white font-bold px-2 py-1 bg-slate-800 rounded">{React.string(Float.toString(match.homeScore) ++ " - " ++ Float.toString(match.awayScore))}</span>
            <span className={"font-medium text-xs " ++ (if match.awayScore > match.homeScore {"text-green-400"} else {"text-slate-300"})}>{React.string(recentName(match.awayTeam))}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
      <div className="text-xs text-slate-400 mb-1">{React.string("H2H Insight")}</div>
      <p className="text-emerald-400 text-sm">{React.string(insight)}</p>
    </div>
    <div className="mt-3 text-xs text-slate-500 text-center">{React.string("Based on all-time competitive meetings between these clubs")}</div>
  </div>
}
