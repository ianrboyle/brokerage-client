import { PortfolioSectors } from "../app/sectors/position.model";
export async function getPositions(jwt: string | undefined) {
  let result = null,
    error = null;

  if (!jwt) {
    throw new Error("Session JWT token not found.");
  }

  try {
    result = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions/sectors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch positions: ${result.statusText}`);
    }

    const data: PortfolioSectors = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: {}, error: error };
  }
}
