// import { useState, useEffect } from "react";
import { PortfolioSectors } from "./position.model";
import PieChart from "../../components/piechart";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getPositions } from "../../server-utils/index";

const Positions = async () => {
  // const [positions, setPositions] = useState<PortfolioSectors>({});
  // const [sectorNames, setSectorNames] = useState<string[]>([]);
  // const [sectorValues, setSectorValues] = useState<number[]>([]);
  const pieChartData: number[] = [];
  const pieChartLabels: string[] = [];
  const session = await getServerSession(authOptions);

  const response = await getPositions(session?.jwt);

  // const result: any = await response.json();
  const sectors = response.result;
  const sectorNames = Object.keys(sectors).map((sectorName) => sectorName);
  console.log("SECTORNAMES", sectorNames);
  // for (const sectorName in sectors) {
  //   if (sectors.hasOwnProperty(sectorName)) {
  //     // Get the sector object
  //     const sector = sectors[sectorName];
  //     // Add sector name to pieChartLabels
  //     pieChartLabels.push(sectorName);
  //     // Add current value to pieChartData
  //     pieChartData.push(sector.currentValue);
  //   }
  // }

  // setSectorNames(pieChartLabels);
  // setSectorValues(pieChartData);

  // setPositions(sectors);

  // useEffect(() => {
  //   getUserPositions(); // Call getPositions when the component mounts
  // }, []);

  if (session)
    return (
      <div>
        <p>hello</p>
      </div>
    );
  return <div>No Positions</div>;
};

export default Positions;

{
  /* {Object.keys(positions).map((sectorName) => ( */
}
//     <li key={sectorName}>
//       <strong>{sectorName}</strong>: {/* Render other properties of sector if needed */}
//     </li>
//   ))}
//   {sectorValues ? <PieChart data={sectorValues} labels={sectorNames} /> : null}
