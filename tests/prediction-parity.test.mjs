import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {calculatePrediction} from '../lib/es6/src/rescript/PredictionEngine.mjs';

// Frozen SHA-256 over canonicalized outputs from 5,000 deterministic inputs to the
// original TypeScript implementation (reproduced during the migration).
const typescriptOracleDigest = 'b9f4fe3e791359d918ba1bc436b8ed50d6f4847de7a127f0808cd3208d56f185';
const stable = value => Array.isArray(value)
  ? value.map(stable)
  : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])]))
    : value;

test('prediction output matches frozen TypeScript oracle over 5,000 deterministic inputs', () => {
  let state = 123456789;
  const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
  const forms = [['W', 'D', 'L'], ['W', 'W', 'W', 'W', 'W'], ['L', 'L', 'L', 'L', 'L'], ['D', 'D', 'D', 'D', 'D']];
  const outputs = [];
  for (let i = 0; i < 5000; i++) {
    const stats = () => ({
      played: 1 + Math.floor(random() * 40), wins: Math.floor(random() * 30),
      draws: Math.floor(random() * 12), losses: Math.floor(random() * 12),
      cleanSheets: Math.floor(random() * 15), form: forms[Math.floor(random() * forms.length)],
      homeWins: Math.floor(random() * 20), homePlayed: Math.floor(random() * 20),
      awayWins: Math.floor(random() * 20), awayPlayed: Math.floor(random() * 20),
      avgGoalsScored: random() * 4, avgGoalsConceded: random() * 4,
    });
    const home = stats();
    const away = stats();
    const totalMatches = 1 + Math.floor(random() * 15);
    const h2h = {
      homeTeamWins: Math.floor(random() * totalMatches),
      awayTeamWins: Math.floor(random() * totalMatches), draws: 0, totalMatches,
      avgGoals: random() * 6, homeTeamGoals: 0, awayTeamGoals: 0, recentMatches: [],
    };
    outputs.push(stable(calculatePrediction(home, away, h2h)));
  }
  const digest = createHash('sha256').update(JSON.stringify(outputs)).digest('hex');
  assert.equal(digest, typescriptOracleDigest);
});
