import { QuboProblem, QuboResult } from "@/types";
import { evaluateQuboEnergy } from "./qubo";

export function runSimulatedAnnealing(
  qubo: QuboProblem,
  maxIterations: number = 500,
  initialTemp: number = 50.0,
  coolingRate: number = 0.98,
  seed: number = 42
): QuboResult {
  const startTime = Date.now();
  const n = qubo.n_variables;

  // Simple deterministic pseudorandom generator based on seed
  let currentSeed = seed;
  const pseudoRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  // Initialize random bitstring
  let currentBitstring: number[] = Array.from({ length: n }, () => (pseudoRandom() > 0.5 ? 1 : 0));
  let currentEval = evaluateQuboEnergy(qubo, currentBitstring);
  let bestBitstring = [...currentBitstring];
  let bestEval = currentEval;

  let temp = initialTemp;
  const convergenceHistory: { iteration: number; energy: number }[] = [];

  for (let iter = 1; iter <= maxIterations; iter++) {
    // Propose a flip
    const flipIdx = Math.floor(pseudoRandom() * n);
    const candidateBitstring = [...currentBitstring];
    candidateBitstring[flipIdx] = candidateBitstring[flipIdx] === 1 ? 0 : 1;

    const candidateEval = evaluateQuboEnergy(qubo, candidateBitstring);
    const deltaE = candidateEval.energy - currentEval.energy;

    // Metropolis criterion
    if (deltaE < 0 || pseudoRandom() < Math.exp(-deltaE / Math.max(0.001, temp))) {
      currentBitstring = candidateBitstring;
      currentEval = candidateEval;

      if (currentEval.energy < bestEval.energy) {
        bestBitstring = [...currentBitstring];
        bestEval = currentEval;
      }
    }

    temp *= coolingRate;

    if (iter % 25 === 0 || iter === 1) {
      convergenceHistory.push({
        iteration: iter,
        energy: Number(bestEval.energy.toFixed(3)),
      });
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
    algorithm: "Simulated Annealing",
    is_quantum_simulator: false,
    hardware_claim: "Classical Metropolis-Hastings Simulated Annealing (CPU).",
    selected_indices: selectedIndices,
    selected_variables: selectedVars,
    best_energy: Number(bestEval.energy.toFixed(4)),
    constraint_satisfied: bestEval.isFeasible,
    runtime_ms: runtimeMs,
    iterations: maxIterations,
    convergence_history: convergenceHistory,
    bitstring: bestBitstring.join(""),
  };
}
