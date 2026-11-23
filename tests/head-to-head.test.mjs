import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as HeadToHead} from '../lib/es6/src/rescript/components/HeadToHead.mjs';

test('HeadToHead renders the historical summary and recent scoreline', () => {
  const markup = renderToStaticMarkup(React.createElement(HeadToHead, {
    homeTeam: {shortName: 'Home FC'},
    awayTeam: {shortName: 'Away FC'},
    h2h: {
      homeTeamWins: 3, awayTeamWins: 1, draws: 2, totalMatches: 6, avgGoals: 2.8,
      recentMatches: [{
        date: '2025-04-01', season: '2024/25', homeTeam: 'Home Football Club',
        awayTeam: 'Away United', homeScore: 2, awayScore: 1,
      }],
    },
  }));
  assert.match(markup, /Head to Head History/);
  assert.match(markup, /style="width:50%"/);
  assert.match(markup, /Home Footbal\.\.\./);
  assert.match(markup, /2 - 1/);
  assert.match(markup, /Home FC has the historical edge with 3 wins in 6 meetings/);
  assert.match(markup, /fixture tends to produce goals/);
});
