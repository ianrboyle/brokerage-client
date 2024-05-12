import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { Sector } from "../lib/models/sector.model";

export async function getSectors() {
  const session = await getServerSession(authOptions);

  let result = null,
    error = null;
  if (!session || !session.jwt) {
    throw new Error("Session JWT token not found.");
  }

  try {
    result = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/sectors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${session.jwt}`,
      },
      credentials: "include",
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch positions: ${result.statusText}`);
    }

    const data: Sector[] = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: {}, error: error };
  }
}
