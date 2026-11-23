import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePrediction } from '../lib/es6/src/rescript/PredictionEngine.mjs';

const home = {
  played: 24, wins: 15, draws: 5, losses: 4, cleanSheets: 8,
  form: ['W', 'D', 'W', 'L', 'W'], homeWins: 9, homePlayed: 12,
  awayWins: 6, awayPlayed: 12, avgGoalsScored: 1.8, avgGoalsConceded: 1.1,
};
const away = {
  played: 24, wins: 11, draws: 6, losses: 7, cleanSheets: 6,
  form: ['D', 'W', 'L', 'W', 'D'], homeWins: 7, homePlayed: 12,
  awayWins: 4, awayPlayed: 12, avgGoalsScored: 1.5, avgGoalsConceded: 1.3,
};
const h2h = {
  homeTeamWins: 3, awayTeamWins: 2, draws: 1, totalMatches: 6, avgGoals: 2.83,
  homeTeamGoals: 10, awayTeamGoals: 8, recentMatches: [],
};

// Frozen reference values captured verbatim from the pre-migration TypeScript implementation.
test('prediction matches frozen TypeScript reference output', () => {
  assert.deepEqual(calculatePrediction(home, away, h2h), {
    homeWinProb: 0.46,
    drawProb: 0.26,
    awayWinProb: 0.28,
    over25Prob: 0.44,
    under25Prob: 0.56,
    over15Prob: 0.73,
    under15Prob: 0.27,
    over35Prob: 0.1,
    bttsProb: 0.71,
    bttsNoProb: 0.29,
    predictedScore: {home: 2, away: 1},
    confidence: 'medium',
    recommendation: 'Slight edge to HOME WIN, but consider Double Chance (1X) for safer play. Both teams likely to score.',
    valueOdds: [{type: 'Home Win', suggestedOdds: 2.18}],
  });
});
