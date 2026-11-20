import { NextRequest, NextResponse } from "next/server";
import { predictCftrPathogenicity } from "@/lib/ml/cftrPathogenicity";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const features = {
      conservation_score: parseFloat(body.conservation_score) || 0.85,
      blosum62_score: parseFloat(body.blosum62_score) || -3.0,
      hydrophobicity_change: parseFloat(body.hydrophobicity_change) || 2.5,
      solvent_accessibility: parseFloat(body.solvent_accessibility) || 20.0,
      charge_change: parseFloat(body.charge_change) || 0,
      domain: body.domain || "NBD1",
    };

    const result = predictCftrPathogenicity(features);

    return NextResponse.json({
      success: true,
      features,
      prediction: result,
      disclaimer: "Model predictions are research estimates and are not clinical diagnoses.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
