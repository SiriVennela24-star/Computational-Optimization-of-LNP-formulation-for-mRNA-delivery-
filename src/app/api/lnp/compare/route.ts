import { NextRequest, NextResponse } from "next/server";
import { getActiveLnpDataset } from "@/lib/datasets/lnpAtlas";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ids: string[] = body.ids || [];

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide an array of formulation IDs to compare." },
        { status: 400 }
      );
    }

    if (ids.length > 5) {
      return NextResponse.json(
        { success: false, error: "Comparison is limited to a maximum of 5 formulations simultaneously." },
        { status: 400 }
      );
    }

    const dataset = getActiveLnpDataset();
    const selected = dataset.filter((f) => ids.includes(f.formulation_id));

    if (selected.length === 0) {
      return NextResponse.json(
        { success: false, error: "None of the specified formulation IDs were found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: selected.length,
      formulations: selected,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
