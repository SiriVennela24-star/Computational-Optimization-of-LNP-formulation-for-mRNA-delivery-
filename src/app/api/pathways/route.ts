import { NextRequest, NextResponse } from "next/server";
import { GSE15568_METADATA, DEG_GENES, REACTOME_PATHWAYS } from "@/lib/datasets/pathwaysData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let genes = [...DEG_GENES];
  if (status) {
    genes = genes.filter((g) => g.expression_status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    metadata: GSE15568_METADATA,
    totalGenes: genes.length,
    genes,
    pathways: REACTOME_PATHWAYS,
  });
}
