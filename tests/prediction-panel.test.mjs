import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as PredictionPanel} from '../lib/es6/src/rescript/components/PredictionPanel.mjs';

test('PredictionPanel renders the recommendation, score, markets and quick picks', () => {
  const markup = renderToStaticMarkup(React.createElement(PredictionPanel, {
    homeTeam: {shortName: 'Home', logo: '🔵'},
    awayTeam: {shortName: 'Away', logo: '🔴'},
    prediction: {
      confidence: 'high', homeWinProb: 0.52, drawProb: 0.25, awayWinProb: 0.23,
      predictedScore: {home: 2, away: 1}, over15Prob: 0.8, over25Prob: 0.62,
      under25Prob: 0.38, over35Prob: 0.3, bttsProb: 0.66, bttsNoProb: 0.34,
      recommendation: 'Strong home result expected.',
    },
  }));
  assert.match(markup, /HIGH CONFIDENCE/);
  assert.match(markup, /style="width:52%"/);
  assert.match(markup, /Predicted Score/);
  assert.match(markup, /Strong home result expected\./);
  assert.match(markup, /✓ Recommended/);
  assert.match(markup, /Home Win/);
  assert.match(markup, /Over 2\.5/);
});
