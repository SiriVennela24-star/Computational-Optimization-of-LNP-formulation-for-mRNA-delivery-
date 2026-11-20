import { NextRequest, NextResponse } from "next/server";
import { buildTargetSelectionQubo, CandidateTarget } from "@/lib/quantum/qubo";
import { DEG_GENES } from "@/lib/datasets/pathwaysData";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const targetK = parseInt(body.target_k) || 3;
    const redundancyWeight = parseFloat(body.redundancy_weight) || 3.0;
    const penaltyMultiplier = parseFloat(body.penalty_multiplier) || 12.0;

    // Build candidate target genes from DEG dataset
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

    return NextResponse.json({
      success: true,
      qubo,
      candidates: candidateTargets,
      mathematical_objective: "Minimize H(x) = -sum(s_i * x_i) + lambda * sum(r_ij * x_i * x_j) + A * (sum(x_i) - K)^2",
      parameters: {
        K: targetK,
        lambda: redundancyWeight,
        A: penaltyMultiplier,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
