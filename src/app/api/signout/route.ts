import { NextResponse } from "next/server";

import { signout } from "../../../server-utils/signout";

export async function POST() {
  try {
    const response = await signout();

    // add error handling
    // if (response.result == null) {
    //   throw new Error();
    // }

    return NextResponse.json(response, { status: 200 });
  } catch {}
}
