"use client";
import { useState, useEffect } from "react";
import { PortfolioSectors } from "./position.model";
import PieChart from "../../components/piechart";

export default function Positions() {
  const [positions, setPositions] = useState<PortfolioSectors>({});
  const [sectorNames, setSectorNames] = useState<string[]>([]);
  const [sectorValues, setSectorValues] = useState<number[]>([]);
  const pieChartData: number[] = [];
  const pieChartLabels: string[] = [];
  const getUserPositions = async () => {
    const response = await fetch(`api/position`, {
      method: "GET",
    });
    const result: any = await response.json();
    const sectors: PortfolioSectors = result["result"];
    const sectorNames = Object.keys(sectors).map((sectorName) => sectorName);
    for (const sectorName in sectors) {
      if (sectors.hasOwnProperty(sectorName)) {
        // Get the sector object
        const sector = sectors[sectorName];
        // Add sector name to pieChartLabels
        pieChartLabels.push(sectorName);
        // Add current value to pieChartData
        pieChartData.push(sector.currentValue);
      }
    }

    setSectorNames(pieChartLabels);
    setSectorValues(pieChartData);

    setPositions(sectors);
  };
  useEffect(() => {
    getUserPositions(); // Call getPositions when the component mounts
  }, []);
  return (
    <div>
      {Object.keys(positions).map((sectorName) => (
        <li key={sectorName}>
          <strong>{sectorName}</strong>: {/* Render other properties of sector if needed */}
        </li>
      ))}
      {sectorValues ? <PieChart data={sectorValues} labels={sectorNames} /> : null}
    </div>
  );
}
