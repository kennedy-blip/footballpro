import test from 'node:test';
import assert from 'node:assert/strict';
import { getConfidenceColor, getProbabilityColor } from '../lib/es6/src/rescript/PredictionColors.mjs';

test('confidence colors preserve existing UI classes', () => {
  assert.equal(getConfidenceColor('high'), 'text-green-500');
  assert.equal(getConfidenceColor('medium'), 'text-yellow-500');
  assert.equal(getConfidenceColor('low'), 'text-red-500');
});

test('probability color thresholds preserve boundary behavior', () => {
  assert.equal(getProbabilityColor(0.6), 'bg-green-500');
  assert.equal(getProbabilityColor(0.4), 'bg-yellow-500');
  assert.equal(getProbabilityColor(0.3999), 'bg-red-500');
});
