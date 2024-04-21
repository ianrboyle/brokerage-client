import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PortfolioIndustry, PortfolioPosition, PortfolioSector, PortfolioSectors } from "../app/sectors/position.model";

const columns: GridColDef[] = [
  { field: "sectorName", headerName: "Sector", width: 200 },
  { field: "percentGain", headerName: "$ Gain", width: 200 },
  { field: "currentValue", headerName: "Current Value", width: 200 },
  { field: "percentOfAccount", headerName: "% of Account", width: 200 },
  { field: "totalCostBasis", headerName: "Total Cost Basis", width: 200 },
];

interface SectorsTableProps {
  sectors: PortfolioSector[];
}

export const SectorsTable: React.FC<SectorsTableProps> = ({ sectors }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={sectors}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};
