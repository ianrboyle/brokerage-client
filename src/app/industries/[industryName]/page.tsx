import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getPositions } from "../../../server-utils";
import PortfolioIndustryDetails from "../../../components/PortfolioIndustryDetails";

const IndustryPage = async () => {
  const session = await getServerSession(authOptions);
  const sectorData = await getPositions(session?.jwt);

  const response = await getPositions(session?.jwt);
  if (session && session.jwt && sectorData.result != null)
    return <PortfolioIndustryDetails sectorData={sectorData.result}></PortfolioIndustryDetails>;
  return null;
};

export default IndustryPage;
