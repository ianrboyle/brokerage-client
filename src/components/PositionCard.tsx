"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Sector } from "../lib/models/sector.model";
import { UpdatePositionIndustryDialog } from "./UpdatePositionIndustryDialog";
import { Position } from "../lib/models/position.model";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
interface PositionCardProps {
  position: Position;
  sectors: Sector[];
}

export const PositionCard: React.FC<PositionCardProps> = ({ position, sectors }) => {
  const [currentPosition, setCurrentPosition] = React.useState(position);

  const updateIndustryDetails = (
    newSectorName: string,
    newIndustryName: string,
    sectorId: number,
    industryId: number
  ) => {
    setCurrentPosition((prev) => ({
      ...prev,
      sectorName: newSectorName,
      sectorId: sectorId,
      industryId: industryId,
      industryName: newIndustryName,
    }));
  };
  return (
    <Box>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {currentPosition.symbol}
            </Typography>
            <Typography variant="h5" component="div">
              {currentPosition.companyName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Sector:" + currentPosition.sectorName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Industry:" + currentPosition.industryName}
            </Typography>
            <Typography variant="body1">Quantity: {currentPosition.quantity}</Typography>
            <Typography variant="body1">Cost Per Share: ${currentPosition.costPerShare}</Typography>
            <Typography variant="body1">Total Cost Basis: ${currentPosition.totalCostBasis}</Typography>
            <Typography variant="body1">Percent Gain: {currentPosition.percentGain}%</Typography>
            <Typography variant="body1">Current Value: ${currentPosition.currentValue}</Typography>
          </CardContent>
          <CardActions>
            <UpdatePositionIndustryDialog
              sectors={sectors}
              positionId={currentPosition.id}
              onUpdateIndustryDetails={updateIndustryDetails}
            />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};
