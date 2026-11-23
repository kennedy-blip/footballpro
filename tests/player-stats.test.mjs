import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as PlayerStats} from '../lib/es6/src/rescript/components/PlayerStats.mjs';

test('PlayerStats displays player stats and transfer notes without inventing missing fields', () => {
  const markup = renderToStaticMarkup(React.createElement(PlayerStats, {
    teamName: 'Liverpool',
    players: [
      {id: 1, name: 'Mohamed Salah', position: 'RW', number: 11, goals: 23, assists: 15, appearances: 35, rating: 8.6, nationality: 'Egypt', age: 33, marketValue: '45M'},
      {id: 2, name: 'Kevin De Bruyne', position: 'CAM', number: 17, goals: 8, assists: 14, appearances: 28, rating: 8.2, nationality: 'Belgium', age: 34, marketValue: '25M', previousClubs: ['Manchester City'], joinedDate: '2025-07-01'},
      {id: 3, name: 'Unknown Player', position: 'GK', goals: 0, assists: 0, appearances: 0, rating: 6.0},
    ],
  }));
  assert.match(markup, /Key Players - Liverpool/);
  assert.match(markup, /Mohamed Salah/);
  assert.match(markup, /23/);
  assert.match(markup, /New Signing/);
  assert.match(markup, /From: Manchester City/);
  assert.match(markup, /Joined 2025-07-01/);
  assert.match(markup, /Unknown Player/);
  assert.doesNotMatch(markup, /undefined/);
});
