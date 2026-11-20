import { NextRequest, NextResponse } from "next/server";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";
import { buildTargetSelectionQubo, CandidateTarget } from "@/lib/quantum/qubo";
import { runQaoaSimulation } from "@/lib/quantum/qaoa";
import { runSimulatedAnnealing } from "@/lib/quantum/annealing";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const algorithm = (body.algorithm || "qaoa").toLowerCase();
    const dataset = getActiveLnpDataset();

    // Map candidate formulations to binary variables
    const candidates: CandidateTarget[] = dataset.slice(0, 8).map((f) => ({
      id: f.formulation_id,
      name: `${f.formulation_id} (${f.ionizable_lipid} + ${f.helper_lipid})`,
      score: (f.delivery_score / 10.0) + (f.encapsulation_efficiency_percent / 20.0),
      redundancy_group: f.ionizable_lipid, // Penalize picking duplicate identical ionizable lipids
    }));

    const qubo = buildTargetSelectionQubo(candidates, 2, 3.5, 15.0);

    let result;
    if (algorithm === "annealing") {
      result = runSimulatedAnnealing(qubo, 300);
    } else {
      result = runQaoaSimulation(qubo, 1);
    }

    return NextResponse.json({
      success: true,
      formulation_candidates: candidates,
      qubo,
      result,
      warning: "Quantum optimization is exploratory. Learned formulation delivery scores derive from real experimental data.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
