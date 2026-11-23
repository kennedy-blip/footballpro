import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as LiveMatches} from '../lib/es6/src/rescript/components/LiveMatches.mjs';

test('LiveMatches remains honest when the live fixture list is empty', () => {
  const markup = renderToStaticMarkup(React.createElement(LiveMatches));
  assert.match(markup, /Live Matches/);
  assert.match(markup, /No matches currently live/);
  assert.match(markup, /The 2025\/26 season starts August 16, 2025/);
  assert.match(markup, /Next Match Day/);
});
