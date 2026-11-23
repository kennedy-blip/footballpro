import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as TeamSelector} from '../lib/es6/src/rescript/components/TeamSelector.mjs';

test('TeamSelector renders league-grouped choices and selected-team summary', () => {
  const teams = [
    {id: 1, name: 'Home FC', shortName: 'Home', logo: '🔵', league: 'Premier League', leagueId: 39},
    {id: 2, name: 'Away FC', shortName: 'Away', logo: '🔴', league: 'Premier League', leagueId: 39},
  ];
  const markup = renderToStaticMarkup(React.createElement(TeamSelector, {
    allTeams: teams,
    leagues: [{id: 39, name: 'Premier League', flag: '🏴'}],
    selectedHome: teams[0], selectedAway: teams[1],
    onSelectHome: () => {}, onSelectAway: () => {},
  }));
  assert.match(markup, /Custom Match Analysis/);
  assert.match(markup, /label="🏴 Premier League"/);
  assert.match(markup, /Home FC/);
  assert.match(markup, /Away FC/);
  assert.match(markup, /Premier League match/);
});
