import { NextRequest, NextResponse } from "next/server";
import { predictLnpDelivery } from "@/lib/ml/deliveryPredictor";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = predictLnpDelivery(body);

    return NextResponse.json({
      success: true,
      explanation_method: "TreeSHAP Local Feature Attribution",
      shap: result.shap,
      disclaimer: "SHAP describes how model inputs shifted the predicted transfection value from baseline.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
