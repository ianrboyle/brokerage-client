import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { Position } from "../lib/models/position.model";

export async function getPositionById(positionId: string) {
  const session = await getServerSession(authOptions);

  let result = null,
    error = null;
  if (!session || !session.jwt) {
    throw new Error("Session JWT token not found.");
  }

  try {
    const url = `${process.env.POSITIONS_SERVICE_URL!}/positions/${positionId}`;
    result = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions/${positionId}`, {
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

    const data: Position = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: {}, error: error };
  }
}
