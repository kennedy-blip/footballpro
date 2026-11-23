import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as UpcomingMatches} from '../lib/es6/src/rescript/components/UpcomingMatches.mjs';

test('UpcomingMatches renders fixture details and preserves the selected-match style', () => {
  const markup = renderToStaticMarkup(React.createElement(UpcomingMatches, {
    matches: [{
      id: 9, leagueId: 39, league: 'Premier League', date: '2025-08-15', time: '12:30',
      homeTeam: {name: 'Arsenal', logo: '🔴'}, awayTeam: {name: 'Liverpool', logo: '🔴'},
      matchweek: 1, venue: 'Emirates Stadium', tvChannel: 'Sky Sports',
    }],
    leagues: [{id: 39, name: 'Premier League', flag: '🏴'}],
    selectedMatchId: 9,
    onSelectMatch: () => {},
  }));
  assert.match(markup, /2025\/26 Season Fixtures/);
  assert.match(markup, /Premier League/);
  assert.match(markup, /Arsenal/);
  assert.match(markup, /Liverpool/);
  assert.match(markup, /Emirates Stadium/);
  assert.match(markup, /Sky Sports/);
  assert.match(markup, /bg-emerald-600\/30 border-emerald-500 ring-2 ring-emerald-500/);
});
