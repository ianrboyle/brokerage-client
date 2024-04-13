import { NextRequest, NextResponse } from "next/server";
import { getPositions } from "../../../serverUtils/getPositions";

export async function GET(request: NextRequest) {
  try {
    const positions = await getPositions();

    return NextResponse.json(positions, { status: 200 });
  } catch {
    return NextResponse.json({ error: "loginData is missing" }, { status: 400 });
  }
}
