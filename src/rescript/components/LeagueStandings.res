type league = {id: float, name: string, flag: string}
type trophies = {@as("league") leagueTitles: float}
type team = {id: float, name: string, logo: string, league: string, leagueId: float, trophies: Nullable.t<trophies>}
type teamStats = {played: float, wins: float, draws: float, losses: float, goalsFor: float, goalsAgainst: float, points: float, form: array<string>}
type row = {team: team, stats: teamStats}

let number = value => React.string(Float.toString(value))
let formColor = value => if value == "W" {"bg-green-500"} else if value == "D" {"bg-yellow-500"} else {"bg-red-500"}
let statCell = (className, value) => <td className={className}>{number(value)}</td>
let rowCompare = (a: row, b: row) => {
  let pointsDiff = b.stats.points -. a.stats.points
  if pointsDiff != 0. {if pointsDiff < 0. {-1} else {1}} else {
    let gdA = a.stats.goalsFor -. a.stats.goalsAgainst
    let gdB = b.stats.goalsFor -. b.stats.goalsAgainst
    let gdDiff = gdB -. gdA
    if gdDiff != 0. {if gdDiff < 0. {-1} else {1}} else {
      let goalsDiff = b.stats.goalsFor -. a.stats.goalsFor
      if goalsDiff < 0. {-1} else if goalsDiff > 0. {1} else {0}
    }
  }
}

@react.component
let make = (~leagueId: float, ~league: Nullable.t<league>, ~teams: array<team>, ~statsForTeam: float => Nullable.t<teamStats>) => {
  switch Nullable.toOption(league) {
  | None => React.null
  | Some(league) => {
    let rows = []
    teams->Array.forEach(team => {
      if team.leagueId == leagueId {
        switch Nullable.toOption(statsForTeam(team.id)) {
        | Some(stats) => rows->Array.push({team, stats})
        | None => ()
        }
      }
    })
    rows->Array.sort((a, b) => Ordering.fromInt(rowCompare(a, b)))
    let standings = rows
    let championsLeagueSpots = 4
    let europaLeagueSpot = championsLeagueSpots + 1
    let relegationStart = Array.length(standings) - 2
    <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">{React.string(league.flag ++ " " ++ league.name ++ " Standings")}</h2>
        <p className="text-slate-400 text-sm mt-1">{React.string("2025/26 Season • Projected after 20 matchdays")}</p>
        <p className="text-emerald-400 text-xs mt-1">{React.string("Based on 2020-2025 historical performance")}</p>
      </div>
      {if Array.length(standings) == 0 {
        <div className="p-8 text-center"><p className="text-slate-400">{React.string("No standings data available for this league")}</p><p className="text-slate-500 text-sm mt-2">{React.string("Select a major league to view standings")}</p></div>
      } else {
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-700/50"><tr className="text-slate-400 text-xs uppercase">
              <th className="py-3 px-4 text-left">{React.string("#")}</th><th className="py-3 px-4 text-left">{React.string("Team")}</th>
              <th className="py-3 px-2 text-center">{React.string("P")}</th><th className="py-3 px-2 text-center">{React.string("W")}</th><th className="py-3 px-2 text-center">{React.string("D")}</th><th className="py-3 px-2 text-center">{React.string("L")}</th>
              <th className="py-3 px-2 text-center">{React.string("GF")}</th><th className="py-3 px-2 text-center">{React.string("GA")}</th><th className="py-3 px-2 text-center">{React.string("GD")}</th><th className="py-3 px-2 text-center">{React.string("Pts")}</th><th className="py-3 px-2 text-center hidden md:table-cell">{React.string("Form")}</th>
            </tr></thead>
            <tbody>
              {React.array(Belt.Array.mapWithIndex(standings, (index, row) => {
                let position = index + 1
                let goalDiff = row.stats.goalsFor -. row.stats.goalsAgainst
                let (positionClass, rowBorder) = if position <= championsLeagueSpots {
                  ("text-green-400", "border-l-4 border-l-green-500")
                } else if position == europaLeagueSpot {
                  ("text-blue-400", "border-l-4 border-l-blue-500")
                } else if position >= relegationStart {
                  ("text-red-400", "border-l-4 border-l-red-500")
                } else {
                  ("text-slate-400", "")
                }
                let promoted = row.team.league == "Premier League" && (row.team.name == "Leeds United" || row.team.name == "Burnley" || row.team.name == "Sheffield United")
                let goalClass = if goalDiff > 0. {"text-green-400"} else if goalDiff < 0. {"text-red-400"} else {"text-slate-400"}
                <tr key={Float.toString(row.team.id)} className={"border-t border-slate-700/50 hover:bg-slate-700/30 transition-colors " ++ rowBorder}>
                  <td className={"py-3 px-4 font-bold " ++ positionClass}>{number(Float.fromInt(position))}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><span className="text-xl">{React.string(row.team.logo)}</span><div><span className="text-white font-medium">{React.string(row.team.name)}</span>{if promoted {<span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">{React.string("PROMOTED")}</span>} else {React.null}}{if !Nullable.isNullable(row.team.trophies) && Nullable.getOrThrow(row.team.trophies).leagueTitles > 0. {<span className="text-yellow-500 text-xs ml-1" title={Float.toString(Nullable.getOrThrow(row.team.trophies).leagueTitles) ++ " league titles"}>{React.string("🏆" ++ Float.toString(Nullable.getOrThrow(row.team.trophies).leagueTitles))}</span>} else {React.null}}</div></div></td>
                  {statCell("py-3 px-2 text-center text-slate-300", row.stats.played)}{statCell("py-3 px-2 text-center text-green-400 font-medium", row.stats.wins)}{statCell("py-3 px-2 text-center text-slate-400", row.stats.draws)}{statCell("py-3 px-2 text-center text-red-400", row.stats.losses)}{statCell("py-3 px-2 text-center text-slate-300", row.stats.goalsFor)}{statCell("py-3 px-2 text-center text-slate-400", row.stats.goalsAgainst)}
                  <td className={"py-3 px-2 text-center font-medium " ++ goalClass}>{React.string(if goalDiff > 0. {"+" ++ Float.toString(goalDiff)} else {Float.toString(goalDiff)})}</td>
                  <td className="py-3 px-2 text-center text-white font-bold text-lg">{number(row.stats.points)}</td>
                  <td className="py-3 px-2 hidden md:table-cell"><div className="flex gap-1 justify-center">{React.array(Belt.Array.mapWithIndex(Belt.Array.slice(row.stats.form, ~offset=0, ~len=5), (formIndex, result) => <span key={Int.toString(formIndex)} className={"w-5 h-5 flex items-center justify-center rounded text-xs font-bold text-white " ++ formColor(result)}>{React.string(result)}</span>))}</div></td>
                </tr>
              }))}
            </tbody>
          </table>
        </div>
      }}
      <div className="p-4 border-t border-slate-700 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"/><span className="text-slate-400">{React.string("Champions League")}</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"/><span className="text-slate-400">{React.string("Europa League")}</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="text-slate-400">{React.string("Relegation Zone")}</span></div>
        <div className="flex items-center gap-2"><span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">{React.string("PROMOTED")}</span><span className="text-slate-400">{React.string("From Championship 2024/25")}</span></div>
      </div>
      <div className="p-4 border-t border-slate-700 bg-slate-900/50"><p className="text-slate-500 text-xs">{React.string("📊 Projected standings based on historical performance analysis from 2020/21 to 2024/25 seasons. Actual standings will update as the 2025/26 season progresses.")}</p></div>
    </div>
  }
  }
}
