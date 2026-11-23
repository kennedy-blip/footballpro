type teamStats = {
  played: float,
  wins: float,
  cleanSheets: float,
  form: array<string>,
  homeWins: float,
  homePlayed: float,
  awayWins: float,
  awayPlayed: float,
  avgGoalsScored: float,
  avgGoalsConceded: float,
}

type headToHead = {
  homeTeamWins: float,
  awayTeamWins: float,
  totalMatches: float,
  avgGoals: float,
}

type valueOdd = {@as("type") type_: string, suggestedOdds: float}

type prediction = {
  homeWinProb: float,
  drawProb: float,
  awayWinProb: float,
  over25Prob: float,
  under25Prob: float,
  over15Prob: float,
  under15Prob: float,
  over35Prob: float,
  bttsProb: float,
  bttsNoProb: float,
  predictedScore: {home: float, away: float},
  confidence: string,
  recommendation: string,
  valueOdds: array<valueOdd>,
}

@val external mathRound: float => float = "Math.round"
@val external mathMax: (float, float) => float = "Math.max"
@val external mathMin: (float, float) => float = "Math.min"
@val external mathAbs: float => float = "Math.abs"

let round2 = value => mathRound(value *. 100.) /. 100.
let roundWhole = value => mathRound(value)

let getFormPoints = form =>
  form->Array.reduce(0., (total, result) =>
    total +. (if result == "W" {3.} else if result == "D" {1.} else {0.})
  )

let calculatePrediction = (homeStats: teamStats, awayStats: teamStats, h2h: headToHead): prediction => {
  let homeFormPoints = getFormPoints(homeStats.form)
  let awayFormPoints = getFormPoints(awayStats.form)
  let homeWinRate = homeStats.wins /. homeStats.played
  let awayWinRate = awayStats.wins /. awayStats.played
  let homeAdvantage = 0.12
  let homeAttackStrength = homeStats.avgGoalsScored /. 1.5
  let awayAttackStrength = awayStats.avgGoalsScored /. 1.5
  let homeDefenseStrength = 1.5 /. mathMax(0.5, homeStats.avgGoalsConceded)
  let awayDefenseStrength = 1.5 /. mathMax(0.5, awayStats.avgGoalsConceded)
  let h2hHomeFactor = h2h.homeTeamWins /. h2h.totalMatches
  let h2hAwayFactor = h2h.awayTeamWins /. h2h.totalMatches
  let homeHomeWinRate = if homeStats.homePlayed > 0. {homeStats.homeWins /. homeStats.homePlayed} else {0.5}
  let awayAwayWinRate = if awayStats.awayPlayed > 0. {awayStats.awayWins /. awayStats.awayPlayed} else {0.3}

  let homeWinProb = homeWinRate *. 0.20 +. (homeFormPoints /. 15.) *. 0.20 +. homeAttackStrength *. 0.10 +. homeDefenseStrength *. 0.08 +. h2hHomeFactor *. 0.12 +. homeAdvantage +. homeHomeWinRate *. 0.18
  let awayWinProb = awayWinRate *. 0.20 +. (awayFormPoints /. 15.) *. 0.20 +. awayAttackStrength *. 0.10 +. awayDefenseStrength *. 0.08 +. h2hAwayFactor *. 0.12 +. awayAwayWinRate *. 0.18
  let total = homeWinProb +. awayWinProb
  let drawBase = 0.26
  let homeWinProb = homeWinProb /. total *. (1. -. drawBase)
  let awayWinProb = awayWinProb /. total *. (1. -. drawBase)
  let drawProb = drawBase
  let strengthDiff = mathAbs(homeWinRate -. awayWinRate)
  let (homeWinProb, drawProb, awayWinProb) = if strengthDiff < 0.1 {
    (homeWinProb -. 0.04, drawProb +. 0.08, awayWinProb -. 0.04)
  } else {
    (homeWinProb, drawProb, awayWinProb)
  }

  let homeExpectedGoals = (homeStats.avgGoalsScored *. homeAttackStrength +. awayStats.avgGoalsConceded /. awayDefenseStrength) /. 2.
  let awayExpectedGoals = (awayStats.avgGoalsScored *. awayAttackStrength +. homeStats.avgGoalsConceded /. homeDefenseStrength) /. 2.
  let totalExpectedGoals = homeExpectedGoals +. awayExpectedGoals
  let over15Prob = mathMin(0.92, mathMax(0.25, 0.50 +. (totalExpectedGoals -. 1.5) *. 0.18))
  let under15Prob = 1. -. over15Prob
  let over25Prob = mathMin(0.85, mathMax(0.15, 0.35 +. (totalExpectedGoals -. 2.5) *. 0.20 +. (h2h.avgGoals -. 2.5) *. 0.08))
  let under25Prob = 1. -. over25Prob
  let over35Prob = mathMin(0.70, mathMax(0.10, 0.20 +. (totalExpectedGoals -. 3.5) *. 0.18))
  let homeCleanSheetRate = homeStats.cleanSheets /. homeStats.played
  let awayCleanSheetRate = awayStats.cleanSheets /. awayStats.played
  let bttsProb = mathMin(0.85, mathMax(0.20, 1. -. (homeCleanSheetRate +. awayCleanSheetRate) /. 2.))
  let bttsNoProb = 1. -. bttsProb

  let maxProb = mathMax(homeWinProb, mathMax(drawProb, awayWinProb))
  let confidence = if maxProb > 0.52 && homeStats.played >= 10. && awayStats.played >= 10. {
    "high"
  } else if maxProb > 0.38 {
    "medium"
  } else {
    "low"
  }

  let recommendation = if homeWinProb > awayWinProb && homeWinProb > drawProb {
    if homeWinProb > 0.48 {
      "Strong bet on HOME WIN. The home team shows superior form and has a significant advantage at their ground."
    } else {
      "Slight edge to HOME WIN, but consider Double Chance (1X) for safer play."
    }
  } else if awayWinProb > homeWinProb && awayWinProb > drawProb {
    if awayWinProb > 0.42 {
      "Consider AWAY WIN. The away team's recent form and stats suggest they can win on the road."
    } else {
      "Away team has an edge, but Double Chance (X2) recommended for safety."
    }
  } else {
    "Match looks evenly contested. Consider DRAW or Double Chance bets for lower risk."
  }

  let recommendation = if over25Prob > 0.60 {
    recommendation ++ ` OVER 2.5 goals looks promising (${Float.toString(roundWhole(over25Prob *. 100.))}% probability).`
  } else if under25Prob > 0.60 {
    recommendation ++ ` UNDER 2.5 goals recommended (${Float.toString(roundWhole(under25Prob *. 100.))}% probability).`
  } else {
    recommendation
  }
  let recommendation = if bttsProb > 0.65 {recommendation ++ " Both teams likely to score."} else {recommendation}
  let valueOdds = []
  if homeWinProb > 0.45 {valueOdds->Array.push({type_: "Home Win", suggestedOdds: round2(1. /. homeWinProb)})}
  if awayWinProb > 0.35 {valueOdds->Array.push({type_: "Away Win", suggestedOdds: round2(1. /. awayWinProb)})}
  if over25Prob > 0.55 {valueOdds->Array.push({type_: "Over 2.5", suggestedOdds: round2(1. /. over25Prob)})}

  {
    homeWinProb: round2(homeWinProb),
    drawProb: round2(drawProb),
    awayWinProb: round2(awayWinProb),
    over15Prob: round2(over15Prob),
    under15Prob: round2(under15Prob),
    over25Prob: round2(over25Prob),
    under25Prob: round2(under25Prob),
    over35Prob: round2(over35Prob),
    bttsProb: round2(bttsProb),
    bttsNoProb: round2(bttsNoProb),
    predictedScore: {home: roundWhole(homeExpectedGoals), away: roundWhole(awayExpectedGoals)},
    confidence,
    recommendation,
    valueOdds,
  }
}
