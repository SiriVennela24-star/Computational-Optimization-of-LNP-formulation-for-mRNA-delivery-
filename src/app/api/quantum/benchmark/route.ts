import { NextResponse } from "next/server";
import { buildTargetSelectionQubo, CandidateTarget } from "@/lib/quantum/qubo";
import { runQaoaSimulation } from "@/lib/quantum/qaoa";
import { runSimulatedAnnealing } from "@/lib/quantum/annealing";
import { runBruteForceOptimization } from "@/lib/quantum/bruteForce";
import { DEG_GENES } from "@/lib/datasets/pathwaysData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const candidateTargets: CandidateTarget[] = DEG_GENES.slice(0, 7).map((d) => ({
      id: d.gene_symbol,
      name: d.gene_symbol,
      score: Math.abs(d.log2_fold_change) * 2.0,
      redundancy_group: d.cftr_pathway_relevance.includes("mucin")
        ? "Mucin"
        : d.cftr_pathway_relevance.includes("channel")
        ? "IonChannel"
        : "Inflammation",
    }));

    const qubo = buildTargetSelectionQubo(candidateTargets, 3, 2.5, 12.0);

    const qaoaResult = runQaoaSimulation(qubo, 1, 42);
    const saResult = runSimulatedAnnealing(qubo, 300, 40, 0.98, 42);
    const bfResult = runBruteForceOptimization(qubo);

    return NextResponse.json({
      success: true,
      problem: {
        n_variables: qubo.n_variables,
        variables: qubo.variable_names,
        target_k: qubo.target_k,
      },
      benchmarks: [
        {
          algorithm: "Exact Brute Force (Ground Truth)",
          best_energy: bfResult.best_energy,
          runtime_ms: bfResult.runtime_ms,
          constraint_satisfied: bfResult.constraint_satisfied,
          selected_variables: bfResult.selected_variables,
          iterations: bfResult.iterations,
        },
        {
          algorithm: "QAOA Simulation (Statevector)",
          best_energy: qaoaResult.best_energy,
          runtime_ms: qaoaResult.runtime_ms,
          constraint_satisfied: qaoaResult.constraint_satisfied,
          selected_variables: qaoaResult.selected_variables,
          iterations: qaoaResult.iterations,
        },
        {
          algorithm: "Classical Simulated Annealing",
          best_energy: saResult.best_energy,
          runtime_ms: saResult.runtime_ms,
          constraint_satisfied: saResult.constraint_satisfied,
          selected_variables: saResult.selected_variables,
          iterations: saResult.iterations,
        },
      ],
      notice: "No quantum advantage is claimed. Classical heuristics often match or outperform current NISQ simulator depths on small problems.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
