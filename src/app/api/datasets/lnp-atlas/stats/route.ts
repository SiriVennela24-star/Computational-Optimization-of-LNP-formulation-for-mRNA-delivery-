import { NextResponse } from "next/server";
import { calculateDatasetStats, getDatasetUniqueComponents } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = calculateDatasetStats();
    const components = getDatasetUniqueComponents();

    return NextResponse.json({
      success: true,
      stats,
      components,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
