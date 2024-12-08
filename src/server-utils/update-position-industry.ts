import { PortfolioSectors } from "../app/sectors/position.model";
import { UpdatePositionIndustry } from "../lib/models/update-position-industry.model";
export async function updatePositionIndustry(
  updatePositionIndustryData: UpdatePositionIndustry,
  jwt: string | undefined
) {
  let result = null,
    error = null;
  const updateIndustryDto = {
    industryId: updatePositionIndustryData.industryId,
  };
  if (!jwt) {
    throw new Error("Session JWT token not found.");
  }

  try {
    result = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions/${updatePositionIndustryData.positionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      credentials: "include",
      body: JSON.stringify(updateIndustryDto),
    });
    if (!result.ok) {
      throw new Error(`Failed to update position: ${result.statusText}`);
    }

    const data: PortfolioSectors = await result.json();
    return { result: data, error: null };
  } catch (e) {
    error = e;
    return { result: {}, error: error };
  }
}
