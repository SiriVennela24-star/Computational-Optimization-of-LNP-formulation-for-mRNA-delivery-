import { NextRequest, NextResponse } from "next/server";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const dataset = getActiveLnpDataset();
  return NextResponse.json({
    success: true,
    total: dataset.length,
    formulations: dataset,
  });
}
