import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getIndustriesBySectorId } from "../../../../server-utils/get-industries-by-sector-id";

export async function GET(req: Request, { params }: { params: { sectorId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.jwt) {
    throw new Error("Session JWT token not found.");
  }
  const { sectorId } = params;

  try {
    const industries = await getIndustriesBySectorId(parseInt(sectorId), session.jwt);
    console.log(industries);
    return NextResponse.json(industries, { status: 200 });
  } catch (error) {
    console.error("Error fetching industries:", error);
    return NextResponse.json({ error: "Failed to fetch industries" }, { status: 500 });
  }
}
