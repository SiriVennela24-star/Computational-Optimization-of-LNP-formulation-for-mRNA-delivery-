import { NextRequest, NextResponse } from "next/server";
import { parseAndValidateLnpCsv, setActiveLnpDataset, calculateDatasetStats } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let csvContent = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided in form data." }, { status: 400 });
      }
      csvContent = await file.text();
    } else {
      const body = await req.json();
      csvContent = body.csvText || "";
    }

    if (!csvContent || csvContent.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Empty CSV content provided." }, { status: 400 });
    }

    const result = parseAndValidateLnpCsv(csvContent);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.errors,
          warnings: result.warnings,
          detectedFields: result.detectedFields,
        },
        { status: 422 }
      );
    }

    // Set active dataset in memory
    setActiveLnpDataset(result.formulations, "User Uploaded LNP Atlas Dataset");
    const stats = calculateDatasetStats();

    return NextResponse.json({
      success: true,
      importedCount: result.formulations.length,
      duplicateCount: result.duplicateCount,
      warnings: result.warnings,
      detectedFields: result.detectedFields,
      stats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
