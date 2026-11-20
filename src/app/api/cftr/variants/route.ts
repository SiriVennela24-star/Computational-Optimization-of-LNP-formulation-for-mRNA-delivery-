import { NextRequest, NextResponse } from "next/server";
import { CLINVAR_CFTR_VARIANTS, CFTR_PROTEIN_INFO } from "@/lib/datasets/cftrVariants";
import { CFTR_MODEL_METRICS } from "@/lib/ml/cftrPathogenicity";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = (searchParams.get("search") || "").toLowerCase();
  const domain = searchParams.get("domain");
  const significance = searchParams.get("significance");

  let variants = [...CLINVAR_CFTR_VARIANTS];

  if (search) {
    variants = variants.filter(
      (v) =>
        v.variant_id.toLowerCase().includes(search) ||
        v.legacy_name.toLowerCase().includes(search) ||
        v.protein_consequence.toLowerCase().includes(search) ||
        v.cdna_change.toLowerCase().includes(search)
    );
  }

  if (domain) {
    variants = variants.filter((v) => v.domain.toLowerCase() === domain.toLowerCase());
  }

  if (significance) {
    variants = variants.filter(
      (v) => v.clinvar_significance.toLowerCase() === significance.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    total: variants.length,
    proteinInfo: CFTR_PROTEIN_INFO,
    modelMetrics: CFTR_MODEL_METRICS,
    variants,
  });
}
