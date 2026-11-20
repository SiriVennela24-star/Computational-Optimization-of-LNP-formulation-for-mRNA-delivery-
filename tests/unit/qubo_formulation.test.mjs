import test from "node:test";
import assert from "node:assert/strict";

function evaluateHamiltonian(linear, quadratic, bitstring, targetK, penaltyMultiplier) {
  let energy = 0;
  const n = bitstring.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (bitstring[i] === 1) {
      count++;
      energy += linear[i];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (bitstring[i] === 1 && bitstring[j] === 1) {
        energy += quadratic[i][j];
      }
    }
  }

  // Constant term A * K^2
  energy += penaltyMultiplier * Math.pow(targetK, 2);
  return { energy, isFeasible: count === targetK, count };
}

test("QUBO exact constraint satisfaction gives lowest penalty energy", () => {
  const K = 2;
  const A = 10.0;
  const scores = [5.0, 4.0, 3.0];
  const n = 3;

  // Linear terms: -s_i + A*(1 - 2K) = -s_i + 10*(1 - 4) = -s_i - 30
  const linear = scores.map((s) => -s + A * (1 - 2 * K));
  // Quadratic terms (no redundancy): 2*A = 20
  const quadratic = Array.from({ length: n }, () => new Array(n).fill(2 * A));

  // Test feasible bitstring [1, 1, 0] (count = 2)
  const feasible = evaluateHamiltonian(linear, quadratic, [1, 1, 0], K, A);
  assert.equal(feasible.isFeasible, true);
  assert.equal(feasible.count, 2);

  // Test infeasible bitstring [1, 0, 0] (count = 1, violates K=2)
  const infeasibleUnder = evaluateHamiltonian(linear, quadratic, [1, 0, 0], K, A);
  assert.equal(infeasibleUnder.isFeasible, false);
  // Energy of infeasible must be significantly higher due to penalty A*(1 - 2)^2 = +10
  assert.ok(feasible.energy < infeasibleUnder.energy);
});
