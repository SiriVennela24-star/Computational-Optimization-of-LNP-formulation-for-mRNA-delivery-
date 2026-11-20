import { QuboProblem } from "@/types";

export interface CandidateTarget {
  id: string;
  name: string;
  score: number; // Biological relevance score (from DEG / clinical evidence)
  redundancy_group: string; // Target family / pathway group for redundancy penalty
}

export function buildTargetSelectionQubo(
  candidates: CandidateTarget[],
  targetK: number,
  redundancyWeight: number = 2.5,
  penaltyMultiplier: number = 10.0
): QuboProblem {
  const n = candidates.length;
  const names = candidates.map((c) => c.name);

  // Linear terms: -score + A*(1 - 2*K)
  const linearTerms: number[] = new Array(n).fill(0);
  // Quadratic matrix N x N
  const qMatrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  // Build redundancy matrix r_{ij}
  const rMatrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (candidates[i].redundancy_group === candidates[j].redundancy_group) {
        // High redundancy penalty for targets in the identical functional class
        rMatrix[i][j] = 1.0;
        rMatrix[j][i] = 1.0;
      }
    }
  }

  // Expansion of: H(x) = -sum(s_i x_i) + lambda*sum(r_ij x_i x_j) + A*(sum(x_i) - K)^2
  // A*(sum(x_i) - K)^2 = A*(sum(x_i^2) + 2*sum_{i<j}(x_i x_j) - 2*K*sum(x_i) + K^2)
  // Since x_i in {0,1}, x_i^2 = x_i
  // Linear coefficient for x_i: -s_i + A*(1 - 2*K)
  // Quadratic coefficient for x_i x_j (i < j): lambda*r_ij + 2*A

  for (let i = 0; i < n; i++) {
    const s_i = candidates[i].score;
    linearTerms[i] = -s_i + penaltyMultiplier * (1 - 2 * targetK);
    qMatrix[i][i] = linearTerms[i];
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const qVal = redundancyWeight * rMatrix[i][j] + 2 * penaltyMultiplier;
      qMatrix[i][j] = qVal;
      qMatrix[j][i] = qVal;
    }
  }

  return {
    name: "CFTR Multi-Target Precision Selection QUBO",
    n_variables: n,
    variable_names: names,
    linear_terms: linearTerms,
    quadratic_matrix: qMatrix,
    target_k: targetK,
    penalty_multiplier: penaltyMultiplier,
    redundancy_weight: redundancyWeight,
  };
}

export function evaluateQuboEnergy(qubo: QuboProblem, bitstring: number[]): { energy: number; isFeasible: boolean; selectedCount: number } {
  let energy = 0;
  const n = qubo.n_variables;
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (bitstring[i] === 1) {
      count++;
      energy += qubo.linear_terms[i];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (bitstring[i] === 1 && bitstring[j] === 1) {
        energy += qubo.quadratic_matrix[i][j];
      }
    }
  }

  // Add constant term A * K^2
  const constant = qubo.penalty_multiplier * Math.pow(qubo.target_k, 2);
  energy += constant;

  const isFeasible = count === qubo.target_k;
  return { energy: Number(energy.toFixed(4)), isFeasible, selectedCount: count };
}
