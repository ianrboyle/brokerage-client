import PieChart from "../../components/piechart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPositionSectors } from "../../server-utils/index";
import { Grid } from "@mui/material";
import { PortfolioIndustry, PortfolioSectors } from "../sectors/position.model";
import { IndustryTable } from "../../components/IndustryTable";

const Industries = async () => {
  const session = await getServerSession(authOptions);
  const response = await getPositionSectors(session?.jwt);
  const pieChartLabels: string[] = [];
  const currentValues: number[] = [];
  const percentOfAccount: number[] = [];
  const industryIds: number[] = [];
  const industries: PortfolioIndustry[] = [];
  const sectors = response.result as PortfolioSectors;
  for (const sectoerName in sectors) {
    const sector = sectors[sectoerName];
    const sectorIndustries = sector.industries;
    for (const industryName in sectorIndustries) {
      const industry = sectorIndustries[industryName];

      industry.id = industry.industryId;
      industryIds.push(industry.industryId);
      industries.push(industry);

      pieChartLabels.push(industryName);
      currentValues.push(industry.currentValue);
      percentOfAccount.push(industry.percentOfAccount);
    }
  }
  if (session)
    return (
      <div className="piechart" style={{ marginTop: "100px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {percentOfAccount && percentOfAccount.length > 0 ? (
              <PieChart
                chartName="Industry Percent of Account"
                data={percentOfAccount}
                labels={pieChartLabels}
                id="chart1"
                chartType="industries"
                chartTypeIds={industryIds}
              />
            ) : null}{" "}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {currentValues && currentValues.length > 0 ? (
              <PieChart
                chartName="Industry Current Values"
                data={currentValues}
                labels={pieChartLabels}
                id="chart2"
                chartType="industries"
                chartTypeIds={industryIds}
              />
            ) : null}{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {industries && industries.length > 0 ? <IndustryTable industries={industries} /> : null}{" "}
          </Grid>
        </Grid>
      </div>
    );
  return <div>No Industries</div>;
};

export default Industries;
