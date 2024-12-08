import { PortfolioSector, PortfolioSectors } from "./position.model";
import PieChart from "../../components/piechart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPositionSectors } from "../../server-utils/index";
import { Grid } from "@mui/material";
import { SectorsTable } from "../../components/SectorsTable";
import Spinner from "../../components/progress/Spinner";
import SkeletonAnimation from "../../components/progress/Skeleton";

const Sectors = async () => {
  const percentOfAccount: number[] = [];
  const currentValues: number[] = [];
  const pieChartLabels: string[] = [];
  const sectorIds: number[] = [];
  const session = await getServerSession(authOptions);

  const response = await getPositionSectors(session?.jwt);

  const sectors = response.result as PortfolioSectors;

  let sectorData: PortfolioSector[] = [];
  for (const sectorName in sectors) {
    if (sectors.hasOwnProperty(sectorName)) {
      const sector = sectors[sectorName];
      sector.id = sector.sectorId;
      sectorData.push(sector);
      pieChartLabels.push(sectorName);
      sectorIds.push(sector.sectorId);
      percentOfAccount.push(sector.percentOfAccount);
      currentValues.push(sector.currentValue);
    }
  }

  if (session)
    return (
      <div className="piechart" style={{ marginTop: "100px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {" "}
            {/* Quadrant 1 */}
            {percentOfAccount && percentOfAccount.length > 0 ? (
              <PieChart
                chartName="Sector Percent of Account 1"
                data={percentOfAccount}
                labels={pieChartLabels}
                id="chart1"
                chartType="sectors"
                chartTypeIds={sectorIds}
              />
            ) : null}{" "}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {" "}
            {/* Quadrant 2 */}
            {currentValues && currentValues.length > 0 ? (
              <PieChart
                chartName="Sector Current Values"
                data={currentValues}
                labels={pieChartLabels}
                id="chart2"
                chartType="sectors"
                chartTypeIds={sectorIds}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {" "}
            {/* Quadrant 2 */}
            {sectorData && sectorData.length > 0 ? <SectorsTable sectors={sectorData} /> : null}
          </Grid>
        </Grid>
      </div>
    );
  return <div>No Sectors</div>;
};

export default Sectors;
