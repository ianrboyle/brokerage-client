import { CreateSectorDto } from "../components/CreateNewSectorCard";

export async function createNewSector(sectorData: CreateSectorDto, jwt: string): Promise<CreateSectorDto> {
  try {
    const res = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/sectors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      body: JSON.stringify(sectorData),
    });

    if (res.status !== 201) {
      throw new Error();
    }

    const newSector = (await res.json()) as CreateSectorDto;

    return newSector;
  } catch (error) {
    throw error;
  }
}
