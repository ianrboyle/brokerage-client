import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ParsedCsvPosition } from "../../../lib/models/csv.model";
import { addMultiplePositions } from "../../../server-utils/add-multiple-positions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.jwt) {
      throw new Error("Session JWT token not found.");
    }

    const formData = await request.formData();
    const payload = formData.get("positions") as string | null;

    if (!payload) {
      return NextResponse.json({ error: "positions are missing" }, { status: 400 });
    }

    const positionsPayload = JSON.parse(payload) as ParsedCsvPosition[];

    const addedPositions: any = await addMultiplePositions(positionsPayload, session.jwt);

    return NextResponse.json(addedPositions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}
