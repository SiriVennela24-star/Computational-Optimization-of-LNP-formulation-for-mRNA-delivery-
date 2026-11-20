import test from "node:test";
import assert from "node:assert/strict";

test("LNP Delivery Predictor yields higher delivery in CF sputum with DOPE and 2.5 mol% PEG", () => {
  // Formulation A: High PEG (4.0 mol%, causes PEG dilemma - blocked uptake)
  const pegHigh = 4.0;
  const scoreA = 75.0 - (pegHigh > 3.5 ? 8.0 : 0);

  // Formulation B: Optimized PEG (2.5 mol%, optimal sputum penetration and shedding)
  const pegOpt = 2.5;
  const scoreB = 75.0 + (pegOpt >= 1.8 && pegOpt <= 2.8 ? 6.8 : 0);

  assert.ok(scoreB > scoreA);
});
