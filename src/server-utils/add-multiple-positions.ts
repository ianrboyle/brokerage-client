import { ParsedCsvPosition } from "../lib/models/csv.model";

export async function addMultiplePositions(positions: ParsedCsvPosition[], jwt: string): Promise<CreatePositionDto[]> {
  try {
    const res = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions/insertmultiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      body: JSON.stringify(positions),
    });

    if (res.status !== 201) {
      throw new Error();
    }

    const newPositions = (await res.json()) as CreatePositionDto[];

    return newPositions;
  } catch (error) {
    throw error;
  }
}

interface CreatePositionDto {
  symbol: string;
  quantity: number;
  costPerShare: number;
  lastPrice?: number;
  companyProfileId: number;
  industryId: number;
  id: number;
}
