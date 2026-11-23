type team = {name: string, logo: string, league: string}
type teamStats = {
  form: array<string>,
  position: float,
  played: float,
  wins: float,
  draws: float,
  losses: float,
  points: float,
  goalsFor: float,
  goalsAgainst: float,
  cleanSheets: float,
  avgGoalsScored: float,
  homeWins: float,
  awayWins: float,
  homePlayed: float,
  awayPlayed: float,
}

let number = value => React.string(Float.toString(value))
let formColor = result => switch result {
| "W" => "bg-green-500"
| "D" => "bg-yellow-500"
| _ => "bg-red-500"
}

@react.component
let make = (~team: team, ~stats: teamStats, ~isHome: bool) => {
  let goalDiff = stats.goalsFor -. stats.goalsAgainst
  let goalDiffClass = if goalDiff > 0. {"text-green-400"} else if goalDiff < 0. {"text-red-400"} else {"text-slate-400"}
  let locationLabel = if isHome {"Home Wins"} else {"Away Wins"}
  let locationWins = if isHome {stats.homeWins} else {stats.awayWins}
  let locationPlayed = if isHome {stats.homePlayed} else {stats.awayPlayed}
  <div className={"bg-slate-800/50 rounded-xl p-5 border border-slate-700 " ++ (if isHome {"border-l-4 border-l-blue-500"} else {"border-r-4 border-r-red-500"})}>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-3xl"> {React.string(team.logo)} </span>
      <div>
        <h3 className="text-white font-bold"> {React.string(team.name)} </h3>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm"> {React.string(team.league)} </span>
          <span className="text-emerald-400 text-sm font-medium"> {React.string("#" ++ Float.toString(stats.position))} </span>
        </div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm"> {React.string("Recent Form")} </span>
        <div className="flex gap-1">
          {React.array(Belt.Array.mapWithIndex(stats.form, (index, result) =>
            <span key={Int.toString(index)} className={"w-6 h-6 flex items-center justify-center rounded text-xs font-bold text-white " ++ formColor(result)}>
              {React.string(result)}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-slate-700/50 rounded-lg p-2"><div className="text-white font-bold text-lg">{number(stats.played)}</div><div className="text-slate-400 text-xs">{React.string("Played")}</div></div>
        <div className="bg-green-500/20 rounded-lg p-2"><div className="text-green-400 font-bold text-lg">{number(stats.wins)}</div><div className="text-slate-400 text-xs">{React.string("Wins")}</div></div>
        <div className="bg-yellow-500/20 rounded-lg p-2"><div className="text-yellow-400 font-bold text-lg">{number(stats.draws)}</div><div className="text-slate-400 text-xs">{React.string("Draws")}</div></div>
        <div className="bg-red-500/20 rounded-lg p-2"><div className="text-red-400 font-bold text-lg">{number(stats.losses)}</div><div className="text-slate-400 text-xs">{React.string("Losses")}</div></div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string("Points")}</span><span className="text-emerald-400 font-bold">{number(stats.points)}</span></div>
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string("Goals")}</span><span className="text-white font-medium">{React.string(Float.toString(stats.goalsFor) ++ " : " ++ Float.toString(stats.goalsAgainst))}</span></div>
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string("Goal Difference")}</span><span className={"font-medium " ++ goalDiffClass}>{React.string(if goalDiff > 0. {"+" ++ Float.toString(goalDiff)} else {Float.toString(goalDiff)})}</span></div>
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string("Clean Sheets")}</span><span className="text-white font-medium">{number(stats.cleanSheets)}</span></div>
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string("Avg Goals/Game")}</span><span className="text-emerald-400 font-medium">{React.string(Float.toFixed(~digits=2, stats.avgGoalsScored))}</span></div>
        <div className="flex justify-between"><span className="text-slate-400 text-sm">{React.string(locationLabel)}</span><span className="text-white font-medium">{React.string(Float.toString(locationWins) ++ " / " ++ Float.toString(locationPlayed))}</span></div>
      </div>
    </div>
  </div>
}
