import { CreateIndustryDto } from "../components/CreateNewIndustryCard";
export async function createNewIndustry(industryData: CreateIndustryDto, jwt: string): Promise<CreateIndustryDto> {
  try {
    const res = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/industries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
      body: JSON.stringify(industryData),
    });

    if (res.status !== 201) {
      throw new Error();
    }

    const newIndustry = (await res.json()) as CreateIndustryDto;

    return newIndustry;
  } catch (error) {
    throw error;
  }
}
