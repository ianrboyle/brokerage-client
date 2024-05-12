import { NextRequest, NextResponse } from "next/server";
import { CreateSectorDto } from "../../../components/CreateNewSectorCard";
import { createNewSector } from "../../../server-utils/create-new-sector";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.jwt) {
      throw new Error("Session JWT token not found.");
    }

    const formData = await request.formData();

    const payload = formData.get("sectorData") as string | null;
    if (!payload) {
      return NextResponse.json({ error: "sectorData is missing" }, { status: 400 });
    }
    const createSectorPayload = JSON.parse(payload) as CreateSectorDto;

    const response = await createNewSector(createSectorPayload, session.jwt);

    // add error handling
    // if (response.result == null) {
    //   throw new Error();
    // }

    return NextResponse.json(response, { status: 200 });
  } catch {}
}
