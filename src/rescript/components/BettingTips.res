type team = {shortName: string}
type valueOdd = {@as("type") type_: string, suggestedOdds: float}
type prediction = {
  confidence: string, homeWinProb: float, awayWinProb: float,
  over25Prob: float, under25Prob: float, over15Prob: float,
  bttsProb: float, bttsNoProb: float, valueOdds: array<valueOdd>,
}
type tip = {type_: string, pick: string, confidence: string, odds: string, reasoning: string}

let confidenceClass = confidence => switch confidence {
| "high" => "border-green-500 bg-green-500/10"
| "medium" => "border-yellow-500 bg-yellow-500/10"
| _ => "border-red-500 bg-red-500/10"
}
let badgeClass = confidence => switch confidence {
| "high" => "bg-green-500"
| "medium" => "bg-yellow-500"
| _ => "bg-red-500"
}
let odds = probability => Float.toFixed(~digits=2, 1. /. probability)
let cap = value => String.toUpperCase(value)

@react.component
let make = (~prediction: prediction, ~homeTeam: team, ~awayTeam: team) => {
  let tips = []
  if prediction.homeWinProb > 0.45 {
    tips->Array.push({type_: "1X2", pick: homeTeam.shortName ++ " to Win", confidence: if prediction.homeWinProb > 0.52 {"high"} else {"medium"}, odds: odds(prediction.homeWinProb), reasoning: "Strong home form and statistical advantage"})
  } else if prediction.awayWinProb > 0.38 {
    tips->Array.push({type_: "1X2", pick: awayTeam.shortName ++ " to Win", confidence: if prediction.awayWinProb > 0.45 {"high"} else {"medium"}, odds: odds(prediction.awayWinProb), reasoning: "Away team showing better current form"})
  } else {
    tips->Array.push({type_: "Double Chance", pick: if prediction.homeWinProb > prediction.awayWinProb {"1X (Home or Draw)"} else {"X2 (Draw or Away)"}, confidence: "medium", odds: "1.40", reasoning: "Match too close to call - safer option"})
  }
  if prediction.over25Prob > 0.58 {
    tips->Array.push({type_: "Goals", pick: "Over 2.5 Goals", confidence: if prediction.over25Prob > 0.65 {"high"} else {"medium"}, odds: odds(prediction.over25Prob), reasoning: "Both teams have high-scoring records"})
  } else if prediction.under25Prob > 0.58 {
    tips->Array.push({type_: "Goals", pick: "Under 2.5 Goals", confidence: if prediction.under25Prob > 0.65 {"high"} else {"medium"}, odds: odds(prediction.under25Prob), reasoning: "Defensive strengths suggest low-scoring match"})
  }
  if prediction.over15Prob > 0.75 {
    tips->Array.push({type_: "Safe Bet", pick: "Over 1.5 Goals", confidence: "high", odds: odds(prediction.over15Prob), reasoning: "Very likely at least 2 goals will be scored"})
  }
  if prediction.bttsProb > 0.60 {
    tips->Array.push({type_: "BTTS", pick: "Both Teams to Score", confidence: if prediction.bttsProb > 0.70 {"high"} else {"medium"}, odds: odds(prediction.bttsProb), reasoning: "Both teams score regularly"})
  } else if prediction.bttsNoProb > 0.55 {
    tips->Array.push({type_: "BTTS", pick: "BTTS - No", confidence: if prediction.bttsNoProb > 0.65 {"high"} else {"medium"}, odds: odds(prediction.bttsNoProb), reasoning: "Strong defensive record suggests a clean sheet"})
  }
  let confidence = prediction.confidence
  let stake = if confidence == "high" {"2-3 units"} else if confidence == "medium" {"1-2 units"} else {"0.5-1 unit"}
  let confidenceTextClass = if confidence == "high" {"text-green-400"} else if confidence == "medium" {"text-yellow-400"} else {"text-red-400"}
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
    <h3 className="text-white font-bold mb-4 flex items-center gap-2">{React.string("💰 Betting Tips Summary")}</h3>
    <div className="space-y-3">
      {React.array(Belt.Array.mapWithIndex(tips, (index, tip) =>
        <div key={Int.toString(index)} className={"rounded-lg p-4 border-l-4 " ++ confidenceClass(tip.confidence)}>
          <div className="flex items-start justify-between mb-2">
            <div><span className="text-slate-400 text-xs">{React.string(tip.type_)}</span><div className="text-white font-bold">{React.string(tip.pick)}</div></div>
            <div className="text-right"><span className={"px-2 py-1 rounded text-xs font-medium text-white " ++ badgeClass(tip.confidence)}>{React.string(cap(tip.confidence))}</span><div className="text-emerald-400 font-bold mt-1">{React.string("@" ++ tip.odds)}</div></div>
          </div>
          <p className="text-slate-400 text-sm">{React.string(tip.reasoning)}</p>
        </div>
      ))}
    </div>
    {if prediction.valueOdds->Array.length > 0 {
      <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
        <h4 className="text-emerald-400 text-sm font-medium mb-2">{React.string("💎 Value Odds")}</h4>
        <div className="grid grid-cols-2 gap-2">
          {React.array(Belt.Array.mapWithIndex(prediction.valueOdds, (index, valueOdd) =>
            <div key={Int.toString(index)} className="flex justify-between text-sm"><span className="text-slate-300">{React.string(valueOdd.type_)}</span><span className="text-emerald-400 font-bold">{React.string("@" ++ Float.toString(valueOdd.suggestedOdds))}</span></div>
          ))}
        </div>
      </div>
    } else {React.null}}
    <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
      <div className="flex items-center justify-between text-sm"><span className="text-slate-400">{React.string("Suggested Stake")}</span><span className="text-white font-medium">{React.string(stake)}</span></div>
      <div className="flex items-center justify-between text-sm mt-2"><span className="text-slate-400">{React.string("Prediction Confidence")}</span><span className={"font-medium " ++ confidenceTextClass}>{React.string(cap(confidence))}</span></div>
    </div>
  </div>
}
