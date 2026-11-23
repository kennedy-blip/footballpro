type teamStats = {
  wins: float, played: float, avgGoalsScored: float, avgGoalsConceded: float,
  cleanSheets: float, homePlayed: float, homeWins: float, awayWins: float,
  awayPlayed: float, points: float,
}
type statItem = {label: string, home: string, away: string, suffix: string, inverted: bool}

@val external parseFloat: string => float = "parseFloat"

let percent = value => Float.toFixed(~digits=1, value)
let decimal = value => Float.toFixed(~digits=2, value)
let statClass = wins => if wins {"font-medium text-green-400"} else {"font-medium text-slate-400"}
let barStyle = width => ReactDOM.Style.unsafeAddProp({}, "width", width)

@react.component
let make = (~homeStats: teamStats, ~awayStats: teamStats, ~homeShortName: string, ~awayShortName: string) => {
  let stats = [
    {label: "Win Rate", home: percent(homeStats.wins /. homeStats.played *. 100.), away: percent(awayStats.wins /. awayStats.played *. 100.), suffix: "%", inverted: false},
    {label: "Goals/Game", home: decimal(homeStats.avgGoalsScored), away: decimal(awayStats.avgGoalsScored), suffix: "", inverted: false},
    {label: "Conceded/Game", home: decimal(homeStats.avgGoalsConceded), away: decimal(awayStats.avgGoalsConceded), suffix: "", inverted: true},
    {label: "Clean Sheet %", home: percent(homeStats.cleanSheets /. homeStats.played *. 100.), away: percent(awayStats.cleanSheets /. awayStats.played *. 100.), suffix: "%", inverted: false},
    {label: "Home/Away Win %", home: if homeStats.homePlayed > 0. {percent(homeStats.homeWins /. homeStats.homePlayed *. 100.)} else {"0"}, away: if awayStats.awayPlayed > 0. {percent(awayStats.awayWins /. awayStats.awayPlayed *. 100.)} else {"0"}, suffix: "%", inverted: false},
    {label: "Points", home: Float.toString(homeStats.points), away: Float.toString(awayStats.points), suffix: "", inverted: false},
  ]
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
    <h3 className="text-white font-bold mb-4 flex items-center gap-2">{React.string("📊 Stats Comparison")}</h3>
    <div className="flex justify-between text-sm mb-4 px-2">
      <span className="text-blue-400 font-medium">{React.string(homeShortName)}</span>
      <span className="text-red-400 font-medium">{React.string(awayShortName)}</span>
    </div>
    <div className="space-y-4">
      {React.array(Belt.Array.mapWithIndex(stats, (index, stat) => {
        let homeVal = parseFloat(stat.home)
        let awayVal = parseFloat(stat.away)
        let total = homeVal +. awayVal
        let homePercent = if total > 0. {homeVal /. total *. 100.} else {50.}
        let awayPercent = if total > 0. {awayVal /. total *. 100.} else {50.}
        let homeWins = if stat.inverted {awayVal > homeVal} else {homeVal > awayVal}
        let awayWins = if stat.inverted {homeVal > awayVal} else {awayVal > homeVal}
        <div key={Int.toString(index)}>
          <div className="flex justify-between text-xs mb-1">
            <span className={statClass(homeWins)}>{React.string(stat.home ++ stat.suffix)}</span>
            <span className="text-slate-500">{React.string(stat.label)}</span>
            <span className={statClass(awayWins)}>{React.string(stat.away ++ stat.suffix)}</span>
          </div>
          <div className="flex h-2 rounded-full overflow-hidden bg-slate-700">
            <div className={"transition-all duration-500 " ++ (if homeWins {"bg-green-500"} else {"bg-blue-500"})} style={barStyle(Float.toString(homePercent) ++ "%")} />
            <div className={"transition-all duration-500 " ++ (if awayWins {"bg-green-500"} else {"bg-red-500"})} style={barStyle(Float.toString(awayPercent) ++ "%")} />
          </div>
        </div>
      }))}
    </div>
  </div>
}
