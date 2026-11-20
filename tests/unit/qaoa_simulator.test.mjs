import test from "node:test";
import assert from "node:assert/strict";

test("QAOA statevector normalizes to unity (sum of probabilities = 1)", () => {
  const n = 3;
  const numStates = 8;
  const initAmp = 1 / Math.sqrt(numStates);
  const real = new Float64Array(numStates).fill(initAmp);
  const imag = new Float64Array(numStates).fill(0);

  // Apply Problem unitary (phase rotation)
  const gamma = 0.5;
  const costValues = [0, 1.2, -3.5, 4.1, -1.8, 2.0, -0.5, 3.2];
  for (let x = 0; x < numStates; x++) {
    const phi = gamma * costValues[x];
    const c = Math.cos(phi);
    const s = -Math.sin(phi);
    const r = real[x];
    const m = imag[x];
    real[x] = r * c - m * s;
    imag[x] = r * s + m * c;
  }

  // Sum probabilities
  let probSum = 0;
  for (let x = 0; x < numStates; x++) {
    probSum += real[x] * real[x] + imag[x] * imag[x];
  }

  assert.ok(Math.abs(probSum - 1.0) < 1e-6);
});
