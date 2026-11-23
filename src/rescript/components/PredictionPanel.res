type team = {shortName: string, logo: string}
type prediction = {
  confidence: string,
  homeWinProb: float, drawProb: float, awayWinProb: float,
  predictedScore: {home: float, away: float},
  over15Prob: float, over25Prob: float, under25Prob: float, over35Prob: float,
  bttsProb: float, bttsNoProb: float, recommendation: string,
}

@val external mathRound: float => float = "Math.round"
let scoreStyle = confidence => switch confidence {
| "high" => "bg-green-500/20 text-green-400 border-green-500"
| "medium" => "bg-yellow-500/20 text-yellow-400 border-yellow-500"
| _ => "bg-red-500/20 text-red-400 border-red-500"
}
let barWidth = value => ReactDOM.Style.unsafeAddProp({}, "width", Float.toString(value *. 100.) ++ "%")
let pct = value => React.string(Float.toString(mathRound(value *. 100.)) ++ "%")
let number = value => React.string(Float.toString(value))

@react.component
let make = (~prediction: prediction, ~homeTeam: team, ~awayTeam: team) => {
  let confidence = String.toUpperCase(prediction.confidence)
  let homeIsTop = prediction.homeWinProb >= prediction.awayWinProb && prediction.homeWinProb >= prediction.drawProb
  let pick = if homeIsTop {homeTeam.shortName ++ " Win"} else if prediction.awayWinProb > prediction.drawProb {awayTeam.shortName ++ " Win"} else {"Draw"}
  let goalsPick = if prediction.over25Prob > prediction.under25Prob {"Over 2.5"} else {"Under 2.5"}
  let goalsEdge = prediction.over25Prob > 0.55 || prediction.under25Prob > 0.55
  <div className="bg-gradient-to-br from-emerald-900/30 to-slate-800/50 rounded-2xl p-6 border border-emerald-500/30">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">{React.string("🎯 AI Prediction")}</h3>
      <span className={"px-3 py-1 rounded-full text-sm font-medium border " ++ scoreStyle(prediction.confidence)}>{React.string(confidence ++ " CONFIDENCE")}</span>
    </div>
    <div className="mb-6">
      <div className="flex justify-between text-sm mb-2"><span className="text-blue-400 font-medium">{React.string(homeTeam.shortName ++ " Win")}</span><span className="text-slate-400">{React.string("Draw")}</span><span className="text-red-400 font-medium">{React.string(awayTeam.shortName ++ " Win")}</span></div>
      <div className="flex h-8 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center transition-all duration-700" style={barWidth(prediction.homeWinProb)}><span className="text-white text-sm font-bold">{pct(prediction.homeWinProb)}</span></div>
        <div className="bg-gradient-to-r from-slate-500 to-slate-400 flex items-center justify-center transition-all duration-700" style={barWidth(prediction.drawProb)}><span className="text-white text-sm font-bold">{pct(prediction.drawProb)}</span></div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center transition-all duration-700" style={barWidth(prediction.awayWinProb)}><span className="text-white text-sm font-bold">{pct(prediction.awayWinProb)}</span></div>
      </div>
    </div>
    <div className="bg-slate-800/80 rounded-xl p-4 mb-6">
      <h4 className="text-slate-400 text-sm text-center mb-3">{React.string("Predicted Score")}</h4>
      <div className="flex items-center justify-center gap-4">
        <div className="text-center"><span className="text-3xl mb-2">{React.string(homeTeam.logo)}</span><div className="text-4xl font-bold text-white">{number(prediction.predictedScore.home)}</div></div>
        <span className="text-2xl text-slate-500">{React.string("-")}</span>
        <div className="text-center"><span className="text-3xl mb-2">{React.string(awayTeam.logo)}</span><div className="text-4xl font-bold text-white">{number(prediction.predictedScore.away)}</div></div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
      <div className="bg-slate-700/50 rounded-xl p-3 text-center"><div className="text-slate-400 text-xs mb-1">{React.string("Over 1.5")}</div><div className={"text-lg font-bold " ++ (if prediction.over15Prob > 0.65 {"text-green-400"} else {"text-slate-300"})}>{pct(prediction.over15Prob)}</div></div>
      <div className="bg-slate-700/50 rounded-xl p-3 text-center"><div className="text-slate-400 text-xs mb-1">{React.string("Over 2.5")}</div><div className={"text-lg font-bold " ++ (if prediction.over25Prob > 0.55 {"text-green-400"} else {"text-slate-300"})}>{pct(prediction.over25Prob)}</div>{if prediction.over25Prob > 0.55 {<div className="text-green-400 text-xs mt-1">{React.string("✓ Recommended")}</div>} else {React.null}}</div>
      <div className="bg-slate-700/50 rounded-xl p-3 text-center"><div className="text-slate-400 text-xs mb-1">{React.string("Under 2.5")}</div><div className={"text-lg font-bold " ++ (if prediction.under25Prob > 0.55 {"text-green-400"} else {"text-slate-300"})}>{pct(prediction.under25Prob)}</div>{if prediction.under25Prob > 0.55 {<div className="text-green-400 text-xs mt-1">{React.string("✓ Recommended")}</div>} else {React.null}}</div>
      <div className="bg-slate-700/50 rounded-xl p-3 text-center"><div className="text-slate-400 text-xs mb-1">{React.string("Over 3.5")}</div><div className={"text-lg font-bold " ++ (if prediction.over35Prob > 0.45 {"text-green-400"} else {"text-slate-300"})}>{pct(prediction.over35Prob)}</div></div>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className={"bg-slate-700/50 rounded-xl p-3 text-center border " ++ (if prediction.bttsProb > 0.55 {"border-green-500/50"} else {"border-transparent"})}><div className="text-slate-400 text-xs mb-1">{React.string("BTTS - Yes")}</div><div className={"text-xl font-bold " ++ (if prediction.bttsProb > 0.55 {"text-green-400"} else {"text-slate-300"})}>{pct(prediction.bttsProb)}</div>{if prediction.bttsProb > 0.60 {<div className="text-green-400 text-xs mt-1">{React.string("✓ Likely")}</div>} else {React.null}}</div>
      <div className={"bg-slate-700/50 rounded-xl p-3 text-center border " ++ (if prediction.bttsNoProb > 0.50 {"border-yellow-500/50"} else {"border-transparent"})}><div className="text-slate-400 text-xs mb-1">{React.string("BTTS - No")}</div><div className={"text-xl font-bold " ++ (if prediction.bttsNoProb > 0.50 {"text-yellow-400"} else {"text-slate-300"})}>{pct(prediction.bttsNoProb)}</div></div>
    </div>
    <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-xl p-4 border border-emerald-500/30"><h4 className="text-emerald-400 font-medium mb-2 flex items-center gap-2">{React.string("💡 Betting Recommendation")}</h4><p className="text-white text-sm leading-relaxed">{React.string(prediction.recommendation)}</p></div>
    <div className="mt-4 grid grid-cols-2 gap-2">
      <div className={"p-3 rounded-lg text-center border " ++ (if homeIsTop {"bg-emerald-600/30 border-emerald-500"} else {"bg-slate-700/50 border-slate-600"})}><div className="text-xs text-slate-400 mb-1">{React.string("1X2 Pick")}</div><div className="text-white font-bold">{React.string(pick)}</div></div>
      <div className={"p-3 rounded-lg text-center border " ++ (if goalsEdge {"bg-emerald-600/30 border-emerald-500"} else {"bg-slate-700/50 border-slate-600"})}><div className="text-xs text-slate-400 mb-1">{React.string("Goals Pick")}</div><div className="text-white font-bold">{React.string(goalsPick)}</div></div>
    </div>
  </div>
}

