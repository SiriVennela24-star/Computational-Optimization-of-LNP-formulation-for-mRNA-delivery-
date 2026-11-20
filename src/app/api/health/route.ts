import { NextResponse } from "next/server";
import { calculateDatasetStats } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = calculateDatasetStats();

  return NextResponse.json({
    status: "healthy",
    platform: "Quantum-XAI CFTR Precision Gene Therapy & LNP Optimization",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    capabilities: {
      cftrGenomics: "available (ClinVar dataset + ML pathogenicity + SHAP)",
      lnpAtlas: `available (${stats.totalFormulations} formulations loaded)`,
      deliveryPredictor: "available (Ensemble model + mucus penetration index)",
      quantumOptimization: "available (Statevector QAOA + Simulated Annealing + Exact Brute Force)",
      geoPathways: "available (GSE15568 CF dataset + Reactome enrichment)",
      runtime: "Vercel Edge & Node.js Serverless Compatible",
    },
    dataset: {
      source: stats.sourceDataset,
      doi: stats.doi,
      version: stats.version,
      totalFormulations: stats.totalFormulations,
    },
  });
}
