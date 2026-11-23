import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as LeagueStandings} from '../lib/es6/src/rescript/components/LeagueStandings.mjs';

test('LeagueStandings sorts by points, applies zones and shows promoted clubs', () => {
  const teams = [
    {id: 1, name: 'Liverpool', logo: '🔴', league: 'Premier League', leagueId: 39, trophies: {league: 1}},
    {id: 2, name: 'Leeds United', logo: '⚪', league: 'Premier League', leagueId: 39},
    {id: 3, name: 'Arsenal', logo: '🔴', league: 'Premier League', leagueId: 39},
    {id: 4, name: 'Burnley', logo: '🍷', league: 'Premier League', leagueId: 39},
  ];
  const stats = new Map([
    [1, {played: 38, wins: 26, draws: 4, losses: 8, goalsFor: 87, goalsAgainst: 38, points: 82, form: ['W', 'W', 'D']}],
    [2, {played: 46, wins: 27, draws: 11, losses: 8, goalsFor: 82, goalsAgainst: 43, points: 92, form: ['W', 'D']}],
    [3, {played: 38, wins: 23, draws: 7, losses: 8, goalsFor: 77, goalsAgainst: 40, points: 76, form: ['D', 'W']}],
    [4, {played: 46, wins: 24, draws: 12, losses: 10, goalsFor: 71, goalsAgainst: 44, points: 84, form: ['W', 'W']}],
  ]);
  const markup = renderToStaticMarkup(React.createElement(LeagueStandings, {
    leagueId: 39,
    league: {id: 39, name: 'Premier League', flag: '🏴'},
    teams,
    statsForTeam: id => stats.get(id) ?? null,
  }));
  assert.ok(markup.indexOf('Leeds United') < markup.indexOf('Burnley'));
  assert.ok(markup.indexOf('Burnley') < markup.indexOf('Liverpool'));
  assert.ok(markup.indexOf('Liverpool') < markup.indexOf('Arsenal'));
  assert.match(markup, /PROMOTED/);
  assert.match(markup, /Champions League/);
  assert.match(markup, /Relegation Zone/);
  assert.match(markup, /🏆1/);
});
