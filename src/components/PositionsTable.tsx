import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Position } from "../lib/models/position.model";

const columns: GridColDef[] = [
  { field: "companyName", headerName: "CompanyName", width: 200 },
  { field: "symbol", headerName: "Symbol", width: 130 },
  { field: "percentGain", headerName: "% Gain", width: 130 },
  { field: "currentValue", headerName: "Current Value", width: 130 },
  { field: "quantity", headerName: "Quantity", width: 70 },
  { field: "totalCostBasis", headerName: "Total Cost Basis", width: 130 },
  { field: "costPerShare", headerName: "Cost Per Share", width: 130 },
  { field: "sectorName", headerName: "Sector", width: 200 },
  { field: "industryName", headerName: "Industry", width: 200 },
];

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={positions}
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
