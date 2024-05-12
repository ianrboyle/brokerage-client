import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PortfolioIndustry, PortfolioPosition } from "../app/sectors/position.model";

const columns: GridColDef[] = [
  { field: "industryName", headerName: "Industry", width: 200 },
  { field: "percentGain", headerName: "$ Gain", width: 130 },
  { field: "currentValue", headerName: "Current Value", width: 130 },
  { field: "percentOfAccount", headerName: "% of Account", width: 130 },
  { field: "totalCostBasis", headerName: "Total Cost Basis", width: 130 },
];

interface IndustryTableProps {
  industries: PortfolioIndustry[];
}

export const IndustryTable: React.FC<IndustryTableProps> = ({ industries }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={industries}
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
