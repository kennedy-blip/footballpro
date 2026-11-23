import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as BettingTips} from '../lib/es6/src/rescript/components/BettingTips.mjs';

test('BettingTips preserves threshold recommendations and stake text', () => {
  const markup = renderToStaticMarkup(React.createElement(BettingTips, {
    homeTeam: {shortName: 'Home'}, awayTeam: {shortName: 'Away'},
    prediction: {
      confidence: 'high', homeWinProb: 0.55, awayWinProb: 0.25,
      over25Prob: 0.62, under25Prob: 0.38, over15Prob: 0.8,
      bttsProb: 0.72, bttsNoProb: 0.28,
      valueOdds: [{type: 'Home Win', suggestedOdds: 1.82}],
    },
  }));
  assert.match(markup, /Home to Win/);
  assert.match(markup, /Over 2\.5 Goals/);
  assert.match(markup, /Over 1\.5 Goals/);
  assert.match(markup, /Both Teams to Score/);
  assert.match(markup, /Value Odds/);
  assert.match(markup, /2-3 units/);
  assert.match(markup, /@1\.82/);
});
