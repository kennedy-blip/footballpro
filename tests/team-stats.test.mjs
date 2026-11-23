import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as TeamStats} from '../lib/es6/src/rescript/components/TeamStats.mjs';

test('ReScript TeamStats renders the expected content and home styling', () => {
  const markup = renderToStaticMarkup(React.createElement(TeamStats, {
    team: {name: 'Demo FC', logo: '⚽', league: 'Premier League'},
    stats: {
      form: ['W', 'D', 'L', 'W'], position: 4, played: 10, wins: 6, draws: 2,
      losses: 2, points: 20, goalsFor: 19, goalsAgainst: 8, cleanSheets: 4,
      avgGoalsScored: 1.9, homeWins: 4, awayWins: 2, homePlayed: 5, awayPlayed: 5,
    },
    isHome: true,
  }));
  assert.match(markup, /border-l-4 border-l-blue-500/);
  assert.match(markup, /Demo FC/);
  assert.match(markup, /Recent Form/);
  assert.match(markup, /19 : 8/);
  assert.match(markup, /\+11/);
  assert.match(markup, /1\.90/);
  assert.match(markup, /Home Wins/);
});
