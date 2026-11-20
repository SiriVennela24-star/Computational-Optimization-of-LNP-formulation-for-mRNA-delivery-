import { NextRequest, NextResponse } from "next/server";
import { buildTargetSelectionQubo, CandidateTarget } from "@/lib/quantum/qubo";
import { runQaoaSimulation } from "@/lib/quantum/qaoa";
import { runSimulatedAnnealing } from "@/lib/quantum/annealing";
import { runBruteForceOptimization } from "@/lib/quantum/bruteForce";
import { DEG_GENES } from "@/lib/datasets/pathwaysData";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const algorithm = (body.algorithm || "qaoa").toLowerCase();
    const targetK = parseInt(body.target_k) || 3;
    const redundancyWeight = parseFloat(body.redundancy_weight) || 3.0;
    const penaltyMultiplier = parseFloat(body.penalty_multiplier) || 12.0;

    const candidateTargets: CandidateTarget[] = DEG_GENES.slice(0, 8).map((d) => ({
      id: d.gene_symbol,
      name: d.gene_symbol,
      score: Math.abs(d.log2_fold_change) * 2.0,
      redundancy_group: d.cftr_pathway_relevance.includes("mucin")
        ? "Mucin Secretion"
        : d.cftr_pathway_relevance.includes("channel") || d.cftr_pathway_relevance.includes("disease")
        ? "Ion Channel Conductance"
        : d.cftr_pathway_relevance.includes("chaperone")
        ? "ER Chaperone Quality Control"
        : "Inflammatory Cytokine Axis",
    }));

    const qubo = buildTargetSelectionQubo(
      candidateTargets,
      targetK,
      redundancyWeight,
      penaltyMultiplier
    );

    let result;
    if (algorithm === "annealing") {
      result = runSimulatedAnnealing(qubo);
    } else if (algorithm === "brute-force") {
      result = runBruteForceOptimization(qubo);
    } else {
      result = runQaoaSimulation(qubo, 1);
    }

    return NextResponse.json({
      success: true,
      qubo,
      result,
      warning: "Quantum optimization is exploratory. No quantum advantage is claimed unless demonstrated through rigorous benchmarking.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
