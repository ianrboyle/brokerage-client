import { cookies } from "next/headers";
export async function getPositions() {
  const cookieStore = cookies();
  const jwtToken = cookieStore.get("jwtToken");
  if (!jwtToken) {
    throw new Error("JWT token not found in cookie");
  }

  let result = null,
    error = null;
  try {
    result = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions/sectors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwtToken.value}`,
      },
      credentials: "include",
    });
    if (!result.ok) {
      throw new Error(`Failed to fetch positions: ${result.statusText}`);
    }

    const data = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: null, error: error };
  }
}
