import { QuboProblem, QuboResult } from "@/types";
import { evaluateQuboEnergy } from "./qubo";

export function runBruteForceOptimization(qubo: QuboProblem): QuboResult {
  const startTime = Date.now();
  const n = qubo.n_variables;
  const numStates = Math.pow(2, n);

  let bestEnergy = Infinity;
  let bestBitstring: number[] = new Array(n).fill(0);
  let isSatisfied = false;

  for (let x = 0; x < numStates; x++) {
    const bitstring: number[] = [];
    for (let i = 0; i < n; i++) {
      bitstring.push((x >> (n - 1 - i)) & 1);
    }

    const res = evaluateQuboEnergy(qubo, bitstring);
    if (res.energy < bestEnergy) {
      bestEnergy = res.energy;
      bestBitstring = bitstring;
      isSatisfied = res.isFeasible;
    }
  }

  const selectedIndices: number[] = [];
  const selectedVars: string[] = [];
  for (let i = 0; i < n; i++) {
    if (bestBitstring[i] === 1) {
      selectedIndices.push(i);
      selectedVars.push(qubo.variable_names[i]);
    }
  }

  const runtimeMs = Date.now() - startTime;

  return {
    algorithm: "Exact Brute Force",
    is_quantum_simulator: false,
    hardware_claim: "Exact Exhaustive Combinatorial Search (Baseline Ground Truth).",
    selected_indices: selectedIndices,
    selected_variables: selectedVars,
    best_energy: Number(bestEnergy.toFixed(4)),
    constraint_satisfied: isSatisfied,
    runtime_ms: runtimeMs,
    iterations: numStates,
    convergence_history: [{ iteration: numStates, energy: Number(bestEnergy.toFixed(3)) }],
    bitstring: bestBitstring.join(""),
  };
}
