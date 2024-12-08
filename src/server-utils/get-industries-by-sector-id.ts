import { Industry } from "../lib/models/industry.model";

export async function getIndustriesBySectorId(
  sectorId: number,
  jwt: string
): Promise<
  | {
      result: Industry[];
      error: null;
    }
  | {
      result: {};
      error: unknown;
    }
> {
  let result = null,
    error = null;
  if (!jwt) {
    throw new Error("Session JWT token not found.");
  }

  try {
    result = await fetch(`${process.env.NEXT_PUBLIC_POSITIONS_SERVICE_URL!}/industries/sector/${sectorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch industry: ${result.statusText}`);
    }

    const data: Industry[] = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: {}, error: error };
  }
}
