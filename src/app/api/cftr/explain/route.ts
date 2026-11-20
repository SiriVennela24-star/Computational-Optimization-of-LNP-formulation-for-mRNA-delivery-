import { NextRequest, NextResponse } from "next/server";
import { predictCftrPathogenicity } from "@/lib/ml/cftrPathogenicity";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = predictCftrPathogenicity({
      conservation_score: parseFloat(body.conservation_score) || 0.85,
      blosum62_score: parseFloat(body.blosum62_score) || -3.0,
      hydrophobicity_change: parseFloat(body.hydrophobicity_change) || 2.5,
      solvent_accessibility: parseFloat(body.solvent_accessibility) || 20.0,
      charge_change: parseFloat(body.charge_change) || 0,
    });

    return NextResponse.json({
      success: true,
      shap: result.shap,
      disclaimer: "SHAP describes how features influence this trained model's prediction. It does not prove biological causality.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
