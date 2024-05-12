// components/IndustryDetails.tsx
"use client";
import React, { useState } from "react";
import { PortfolioIndustry, PortfolioPosition, PortfolioSector, PortfolioSectors } from "../app/sectors/position.model";
import { Button, dividerClasses, Grid } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import PieChart from "./piechart";
import { PositionsTable } from "./PositionsTable";
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

  // Now you have the industry data, you can use it as needed
  if (positions && positions.length > 0)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <h1>{industryName}</h1>
            <PositionsTable positions={positions}></PositionsTable>
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
  // return <div style={{ marginTop: "100px", textAlign: "center" }}>hello</div>;
};

export default PortfolioIndustryDetails;
