// components/IndustryDetails.tsx
"use client";
import React from "react";
import { PortfolioIndustry, PortfolioSectors } from "../app/sectors/position.model";
import { Grid } from "@mui/material";
import { usePathname } from "next/navigation";
import PieChart from "./piechart";
import { IndustryTable } from "./IndustryTable";
import Spinner from "./progress/Spinner";

interface PortfolioSectorDetailsProps {
  sectorData: PortfolioSectors;
}

const PortfolioSectorDetails: React.FC<PortfolioSectorDetailsProps> = ({ sectorData }) => {
  const pathName = usePathname();
  const lastPathSegment = pathName.split("/").pop();
  const sectorName = lastPathSegment ? decodeURIComponent(lastPathSegment) : "";
  const currentValues: number[] = [];
  const percentOfAccount: number[] = [];
  const industryIds: number[] = [];
  const pieChartLabels: string[] = [];

  const sector = sectorData[sectorName];
  const industriesObject = sector?.industries;
  const industries: PortfolioIndustry[] = [];
  for (const industryName in industriesObject) {
    const ind = industriesObject[industryName];
    ind.id = ind.industryId;
    industries.push(ind);
    pieChartLabels.push(industryName);
    currentValues.push(ind.currentValue);
    percentOfAccount.push(ind.percentOfAccount);
    industryIds.push(ind.industryId);
  }

  // Now you have the industry data, you can use it as needed
  if (industries && industries.length > 0)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <IndustryTable industries={industries} />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {" "}
            {/* Quadrant 1 */}
            {currentValues && currentValues.length > 0 ? (
              <PieChart
                chartName="Industry Current Values"
                data={currentValues}
                labels={pieChartLabels}
                id="chart1"
                chartType="industries"
                chartTypeIds={industryIds}
              />
            ) : null}{" "}
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {" "}
            {/* Quadrant 1 */}
            {percentOfAccount && percentOfAccount.length > 0 ? (
              <PieChart
                chartName="Percents"
                data={percentOfAccount}
                labels={pieChartLabels}
                id="chart2"
                chartType="industries"
                chartTypeIds={industryIds}
              />
            ) : null}{" "}
          </Grid>
        </Grid>
      </div>
    );
  if (!industries || industries.length == 0)
    <div style={{ marginTop: "200px" }}>
      <Spinner />
    </div>;
};

export default PortfolioSectorDetails;
