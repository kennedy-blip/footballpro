import { TeamStats, Prediction, HeadToHead } from '../types/football';

export function calculatePrediction(
  homeStats: TeamStats,
  awayStats: TeamStats,
  h2h: HeadToHead
): Prediction {
  // Form weight calculation (recent 5 games)
  const getFormPoints = (form: ('W' | 'D' | 'L')[]) => {
    return form.reduce((acc, result) => {
      if (result === 'W') return acc + 3;
      if (result === 'D') return acc + 1;
      return acc;
    }, 0);
  };

  const homeFormPoints = getFormPoints(homeStats.form);
  const awayFormPoints = getFormPoints(awayStats.form);

  // Win rate calculation
  const homeWinRate = homeStats.wins / homeStats.played;
  const awayWinRate = awayStats.wins / awayStats.played;

  // Home advantage factor (typically 10-15% boost)
  const homeAdvantage = 0.12;

  // Goal scoring/conceding strength
  const homeAttackStrength = homeStats.avgGoalsScored / 1.5; // normalized to average
  const awayAttackStrength = awayStats.avgGoalsScored / 1.5;
  const homeDefenseStrength = 1.5 / Math.max(0.5, homeStats.avgGoalsConceded);
  const awayDefenseStrength = 1.5 / Math.max(0.5, awayStats.avgGoalsConceded);

  // H2H factor
  const h2hHomeFactor = h2h.homeTeamWins / h2h.totalMatches;
  const h2hAwayFactor = h2h.awayTeamWins / h2h.totalMatches;

  // Home win rate at home
  const homeHomeWinRate = homeStats.homePlayed > 0 ? homeStats.homeWins / homeStats.homePlayed : 0.5;
  const awayAwayWinRate = awayStats.awayPlayed > 0 ? awayStats.awayWins / awayStats.awayPlayed : 0.3;

  // Combined probability calculation
  let homeWinProb = (
    homeWinRate * 0.20 +
    (homeFormPoints / 15) * 0.20 +
    homeAttackStrength * 0.10 +
    homeDefenseStrength * 0.08 +
    h2hHomeFactor * 0.12 +
    homeAdvantage +
    homeHomeWinRate * 0.18
  );

  let awayWinProb = (
    awayWinRate * 0.20 +
    (awayFormPoints / 15) * 0.20 +
    awayAttackStrength * 0.10 +
    awayDefenseStrength * 0.08 +
    h2hAwayFactor * 0.12 +
    awayAwayWinRate * 0.18
  );

  // Normalize probabilities
  const total = homeWinProb + awayWinProb;
  const drawBase = 0.26; // Base draw probability

  homeWinProb = (homeWinProb / total) * (1 - drawBase);
  awayWinProb = (awayWinProb / total) * (1 - drawBase);
  let drawProb = drawBase;

  // Adjust draw probability based on team similarities
  const strengthDiff = Math.abs(homeWinRate - awayWinRate);
  if (strengthDiff < 0.1) {
    drawProb += 0.08;
    homeWinProb -= 0.04;
    awayWinProb -= 0.04;
  }

  // Expected goals calculation
  const homeExpectedGoals = (homeStats.avgGoalsScored * homeAttackStrength + awayStats.avgGoalsConceded / awayDefenseStrength) / 2;
  const awayExpectedGoals = (awayStats.avgGoalsScored * awayAttackStrength + homeStats.avgGoalsConceded / homeDefenseStrength) / 2;
  const totalExpectedGoals = homeExpectedGoals + awayExpectedGoals;

  // Over/Under calculations using Poisson-inspired approach
  const over15Prob = Math.min(0.92, Math.max(0.25, 0.50 + (totalExpectedGoals - 1.5) * 0.18));
  const under15Prob = 1 - over15Prob;
  
  const over25Prob = Math.min(0.85, Math.max(0.15, 0.35 + (totalExpectedGoals - 2.5) * 0.20 + (h2h.avgGoals - 2.5) * 0.08));
  const under25Prob = 1 - over25Prob;
  
  const over35Prob = Math.min(0.70, Math.max(0.10, 0.20 + (totalExpectedGoals - 3.5) * 0.18));

  // BTTS (Both Teams To Score)
  const homeCleanSheetRate = homeStats.cleanSheets / homeStats.played;
  const awayCleanSheetRate = awayStats.cleanSheets / awayStats.played;
  const bttsProb = Math.min(0.85, Math.max(0.20, 1 - (homeCleanSheetRate + awayCleanSheetRate) / 2));
  const bttsNoProb = 1 - bttsProb;

  // Predicted score
  const predictedScore = {
    home: Math.round(homeExpectedGoals),
    away: Math.round(awayExpectedGoals),
  };

  // Confidence level based on data quality and probability spread
  const maxProb = Math.max(homeWinProb, drawProb, awayWinProb);
  let confidence: 'low' | 'medium' | 'high';
  if (maxProb > 0.52 && homeStats.played >= 10 && awayStats.played >= 10) {
    confidence = 'high';
  } else if (maxProb > 0.38) {
    confidence = 'medium';
  } else {
    confidence = 'low';
  }

  // Generate recommendation
  let recommendation = '';
  if (homeWinProb > awayWinProb && homeWinProb > drawProb) {
    if (homeWinProb > 0.48) {
      recommendation = `Strong bet on HOME WIN. The home team shows superior form and has a significant advantage at their ground.`;
    } else {
      recommendation = `Slight edge to HOME WIN, but consider Double Chance (1X) for safer play.`;
    }
  } else if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
    if (awayWinProb > 0.42) {
      recommendation = `Consider AWAY WIN. The away team's recent form and stats suggest they can win on the road.`;
    } else {
      recommendation = `Away team has an edge, but Double Chance (X2) recommended for safety.`;
    }
  } else {
    recommendation = `Match looks evenly contested. Consider DRAW or Double Chance bets for lower risk.`;
  }

  if (over25Prob > 0.60) {
    recommendation += ` OVER 2.5 goals looks promising (${Math.round(over25Prob * 100)}% probability).`;
  } else if (under25Prob > 0.60) {
    recommendation += ` UNDER 2.5 goals recommended (${Math.round(under25Prob * 100)}% probability).`;
  }

  if (bttsProb > 0.65) {
    recommendation += ` Both teams likely to score.`;
  }

  // Value odds suggestions
  const valueOdds: { type: string; suggestedOdds: number }[] = [];
  if (homeWinProb > 0.45) {
    valueOdds.push({ type: 'Home Win', suggestedOdds: Math.round((1 / homeWinProb) * 100) / 100 });
  }
  if (awayWinProb > 0.35) {
    valueOdds.push({ type: 'Away Win', suggestedOdds: Math.round((1 / awayWinProb) * 100) / 100 });
  }
  if (over25Prob > 0.55) {
    valueOdds.push({ type: 'Over 2.5', suggestedOdds: Math.round((1 / over25Prob) * 100) / 100 });
  }

  return {
    homeWinProb: Math.round(homeWinProb * 100) / 100,
    drawProb: Math.round(drawProb * 100) / 100,
    awayWinProb: Math.round(awayWinProb * 100) / 100,
    over15Prob: Math.round(over15Prob * 100) / 100,
    under15Prob: Math.round(under15Prob * 100) / 100,
    over25Prob: Math.round(over25Prob * 100) / 100,
    under25Prob: Math.round(under25Prob * 100) / 100,
    over35Prob: Math.round(over35Prob * 100) / 100,
    bttsProb: Math.round(bttsProb * 100) / 100,
    bttsNoProb: Math.round(bttsNoProb * 100) / 100,
    predictedScore,
    confidence,
    recommendation,
    valueOdds,
  };
}

export function getConfidenceColor(confidence: 'low' | 'medium' | 'high'): string {
  switch (confidence) {
    case 'high': return 'text-green-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-red-500';
  }
}

export function getProbabilityColor(prob: number): string {
  if (prob >= 0.6) return 'bg-green-500';
  if (prob >= 0.4) return 'bg-yellow-500';
  return 'bg-red-500';
}
