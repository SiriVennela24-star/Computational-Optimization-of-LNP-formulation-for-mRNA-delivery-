import { NextRequest, NextResponse } from "next/server";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const dataset = getActiveLnpDataset();
  const formulation = dataset.find(
    (f) => f.formulation_id.toLowerCase() === id.toLowerCase()
  );

  if (!formulation) {
    return NextResponse.json(
      { success: false, error: `Formulation '${id}' not found in LNP Atlas.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    formulation,
  });
}
