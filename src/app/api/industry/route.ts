import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CreateIndustryDto } from "../../../components/CreateNewIndustryCard";
import { createNewIndustry } from "../../../server-utils/create-new-industry";

import { updatePositionIndustry } from "../../../server-utils/update-position-industry";
import { UpdatePositionIndustry } from "../../../lib/models/update-position-industry.model";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.jwt) {
      throw new Error("Session JWT token not found.");
    }

    const formData = await request.formData();

    const payload = formData.get("industryData") as string | null;
    if (!payload) {
      return NextResponse.json({ error: "industryData is missing" }, { status: 400 });
    }
    const createIndustryPayload = JSON.parse(payload) as CreateIndustryDto;

    const response = await createNewIndustry(createIndustryPayload, session.jwt);

    // add error handling
    // if (response.result == null) {
    //   throw new Error();
    // }

    return NextResponse.json(response, { status: 200 });
  } catch {}
}

export async function PATCH(request: NextRequest) {
  try {
    console.log("IS PATCH HIT???");
    const session = await getServerSession(authOptions);
    if (!session || !session.jwt) {
      throw new Error("Session JWT token not found.");
    }

    const formData = await request.formData();

    const payload = formData.get("updatePositionIndustryData") as string | null;
    if (!payload) {
      return NextResponse.json({ error: "updatePositionIndustryData is missing" }, { status: 400 });
    }
    const updatePositionIndustryData = JSON.parse(payload) as UpdatePositionIndustry;

    const response = await updatePositionIndustry(updatePositionIndustryData, session.jwt);

    // add error handling
    // if (response.result == null) {
    //   throw new Error();
    // }
    console.log(response);

    return NextResponse.json(response, { status: 200 });
  } catch {}
}
