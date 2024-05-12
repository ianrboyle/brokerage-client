import { CreateNewIndustryCard } from "../../components/CreateNewIndustryCard";
import { CreateNewSectorCard } from "../../components/CreateNewSectorCard";
import { Sector } from "../../lib/models/sector.model";
import { getSectors } from "../../server-utils/get-sectors";

export default async function CreateNew() {
  const response = await getSectors();

  const sectors = response.result as Sector[];

  if (sectors && sectors.length > 0) return <CreateNewIndustryCard sectors={sectors} />;
}
