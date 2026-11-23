import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as StatsComparison} from '../lib/es6/src/rescript/components/StatsComparison.mjs';

test('StatsComparison preserves formatted values, winner colors and zero-away fallback', () => {
  const homeStats = {
    wins: 6, played: 10, avgGoalsScored: 1.8, avgGoalsConceded: 1.1,
    cleanSheets: 4, homePlayed: 5, homeWins: 4, awayWins: 2, awayPlayed: 5, points: 20,
  };
  const awayStats = {
    wins: 4, played: 10, avgGoalsScored: 1.4, avgGoalsConceded: 1.8,
    cleanSheets: 2, homePlayed: 5, homeWins: 2, awayWins: 0, awayPlayed: 0, points: 14,
  };
  const markup = renderToStaticMarkup(React.createElement(StatsComparison, {
    homeStats, awayStats, homeShortName: 'Home', awayShortName: 'Away',
  }));
  assert.match(markup, /60\.0%/);
  assert.match(markup, /40\.0%/);
  assert.match(markup, /Conceded\/Game/);
  assert.match(markup, /80\.0%/);
  assert.match(markup, /Home\/Away Win %/);
  assert.match(markup, /style="width:0%"/);
});
