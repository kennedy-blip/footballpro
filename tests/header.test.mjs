import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {make as Header} from '../lib/es6/src/rescript/components/Header.mjs';

test('Header keeps app identity, league badges and season data visible', () => {
  const markup = renderToStaticMarkup(React.createElement(Header));
  assert.match(markup, /FootballPredictor Pro/);
  assert.match(markup, /AI-Powered Match Analysis • 2025\/26 Season/);
  assert.match(markup, /Data Updated/);
  assert.match(markup, /Premier League/);
  assert.match(markup, /2020-2025/);
});
