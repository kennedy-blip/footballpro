import test from 'node:test';
import assert from 'node:assert/strict';
import data from '../src/data/standings2024_25.json' with {type: 'json'};

test('orphaned 2024/25 final standings are preserved verbatim as data', () => {
  assert.equal(data.premierLeague2024_25.length, 20);
  assert.equal(data.championship2024_25.length, 6);
  assert.equal(data.laLiga2024_25.length, 20);
  assert.equal(data.bundesliga2024_25.length, 18);
  assert.equal(data.serieA2024_25.length, 20);
  assert.equal(data.ligue1_2024_25.length, 18);
  assert.equal(data.premierLeague2024_25[0].teamId, 'liverpool');
  assert.equal(data.premierLeague2024_25[0].points, 82);
  assert.equal(data.ligue1_2024_25[0].teamName, 'Paris Saint-Germain');
});
