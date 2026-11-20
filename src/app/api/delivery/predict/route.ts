import { NextRequest, NextResponse } from "next/server";
import { predictLnpDelivery } from "@/lib/ml/deliveryPredictor";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const input = {
      ionizable_lipid: body.ionizable_lipid || "SM-102",
      helper_lipid: body.helper_lipid || "DSPC",
      sterol_lipid: body.sterol_lipid || "Cholesterol",
      peg_lipid: body.peg_lipid || "DMG-PEG2000",
      ratio_ionizable: parseFloat(body.ratio_ionizable) || 50.0,
      ratio_helper: parseFloat(body.ratio_helper) || 10.0,
      ratio_sterol: parseFloat(body.ratio_sterol) || 38.5,
      ratio_peg: parseFloat(body.ratio_peg) || 1.5,
      target_type: body.target_type || "CFBE41o- (CF Bronchial)",
      cargo_type: body.cargo_type || "CFTR mRNA",
      synthesis_method: body.synthesis_method || "Microfluidic Mixing",
    };

    const prediction = predictLnpDelivery(input);

    return NextResponse.json({
      success: true,
      input,
      prediction,
      model: "Ensemble Gradient-Boosted Formulation Regressor",
      disclaimer: "Prediction is a computational research estimate. Physical validation in vitro/in vivo required.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
