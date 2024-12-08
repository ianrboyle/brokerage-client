import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getPositionSectors } from "../../../server-utils";
import PortfolioSectorDetails from "../../../components/PortfolioSectorDetails";

const SectorPage = async () => {
  const session = await getServerSession(authOptions);
  const sectorData = await getPositionSectors(session?.jwt);

  if (session && session.jwt && sectorData.result != null)
    return <PortfolioSectorDetails sectorData={sectorData.result}></PortfolioSectorDetails>;
  return null;
};

export default SectorPage;
