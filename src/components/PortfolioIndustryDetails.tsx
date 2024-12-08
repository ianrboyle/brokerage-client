// components/IndustryDetails.tsx
"use client";
import React from "react";
import { PortfolioPosition, PortfolioSectors } from "../app/sectors/position.model";
import { Grid } from "@mui/material";
import { usePathname } from "next/navigation";
import PieChart from "./piechart";
import { PortfolioPositionsTable } from "./PortfolioPositionsTable";
// import { PortfolioSectors } from '../types';

interface PortfolioIndustryDetailsProps {
  sectorData: PortfolioSectors;
}

const PortfolioIndustryDetails: React.FC<PortfolioIndustryDetailsProps> = ({ sectorData }) => {
  const pathName = usePathname();
  const lastPathSegment = pathName.split("/").pop();
  const industryName = lastPathSegment ? decodeURIComponent(lastPathSegment) : ""; // Access the industryName parameter from the URL
  const currentValues: number[] = [];
  const positionIds: number[] = [];
  const pieChartLabels: string[] = [];

  const industry = sectorData[industryName];
  const positions: PortfolioPosition[] = [];
  for (const sectorName in sectorData) {
    const sector = sectorData[sectorName];
    for (const industryKey in sector.industries) {
      if (industryKey === industryName) {
        const ind = sector.industries[industryKey];

        for (const positionName in ind.positions) {
          const position = ind.positions[positionName];
          position.id = position.positionId;

          positions.push(position);
          currentValues.push(position.currentValue);
          positionIds.push(position.positionId);
          pieChartLabels.push(positionName);
        }
      }
    }
  }

  if (positions && positions.length > 0)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <h1>{industryName}</h1>
            <PortfolioPositionsTable positions={positions}></PortfolioPositionsTable>
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
                chartType="positions"
                chartTypeIds={positionIds}
              />
            ) : null}{" "}
          </Grid>
        </Grid>
      </div>
    );
};

export default PortfolioIndustryDetails;
