import { NextRequest, NextResponse } from "next/server";
import { SignUpData } from "../../signup/page";
import { signUp } from "../../../serverUtils/signUpUser";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const payload = formData.get("signUpData") as string | null;
    if (!payload) {
      return NextResponse.json({ error: "signUpData is missing" }, { status: 400 });
    }
    const signUpPayload = JSON.parse(payload) as SignUpData;

    const response = await signUp(signUpPayload);

    // add error handling
    // if (response.result == null) {
    //   throw new Error();
    // }

    return NextResponse.json(response, { status: 200 });
  } catch {}
}
