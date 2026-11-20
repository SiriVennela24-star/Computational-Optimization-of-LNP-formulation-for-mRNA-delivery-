import { NextRequest, NextResponse } from "next/server";
import { getActiveLnpDataset, exportDatasetToCsv } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").toLowerCase();
    const ionizable = (searchParams.get("ionizable") || "").toLowerCase();
    const helper = (searchParams.get("helper") || "").toLowerCase();
    const sterol = (searchParams.get("sterol") || "").toLowerCase();
    const peg = (searchParams.get("peg") || "").toLowerCase();
    const target = (searchParams.get("target") || "").toLowerCase();
    const cargo = (searchParams.get("cargo") || "").toLowerCase();
    const synthesis = (searchParams.get("synthesis") || "").toLowerCase();
    const format = searchParams.get("format");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");

    let dataset = getActiveLnpDataset();

    // Export full CSV if requested
    if (format === "csv") {
      const csvData = exportDatasetToCsv(dataset);
      return new NextResponse(csvData, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="LNP_Atlas_DB_Export.csv"',
        },
      });
    }

    // Apply filtering
    if (search) {
      dataset = dataset.filter(
        (d) =>
          d.formulation_id.toLowerCase().includes(search) ||
          d.ionizable_lipid.toLowerCase().includes(search) ||
          d.helper_lipid.toLowerCase().includes(search) ||
          d.target_type.toLowerCase().includes(search) ||
          d.paper_title.toLowerCase().includes(search) ||
          d.paper_doi.toLowerCase().includes(search)
      );
    }

    if (ionizable) {
      dataset = dataset.filter((d) => d.ionizable_lipid.toLowerCase() === ionizable);
    }
    if (helper) {
      dataset = dataset.filter((d) => d.helper_lipid.toLowerCase() === helper);
    }
    if (sterol) {
      dataset = dataset.filter((d) => d.sterol_lipid.toLowerCase() === sterol);
    }
    if (peg) {
      dataset = dataset.filter((d) => d.peg_lipid.toLowerCase() === peg);
    }
    if (target) {
      dataset = dataset.filter((d) => d.target_type.toLowerCase() === target);
    }
    if (cargo) {
      dataset = dataset.filter((d) => d.cargo_type.toLowerCase() === cargo);
    }
    if (synthesis) {
      dataset = dataset.filter((d) => d.synthesis_method.toLowerCase() === synthesis);
    }

    const total = dataset.length;
    const startIndex = (page - 1) * limit;
    const paginated = dataset.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      formulations: paginated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
