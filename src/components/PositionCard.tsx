import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getSectors } from "../server-utils/get-sectors";
import { Sector } from "../lib/models/sector.model";
import { UpdatePositionIndustryDialog } from "./UpdatePositionIndustryDialog";

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
  // const response = await getSectors();

  // const sectors = response.result as Sector[];
  return (
    <Box>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {position.symbol}
            </Typography>
            <Typography variant="h5" component="div">
              {position.companyName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Sector:" + position.sectorName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {"Industry:" + position.industryName}
            </Typography>
            <Typography variant="body1">Quantity: {position.quantity}</Typography>
            <Typography variant="body1">Cost Per Share: ${position.costPerShare}</Typography>
            <Typography variant="body1">Total Cost Basis: ${position.totalCostBasis}</Typography>
            <Typography variant="body1">Percent Gain: {position.percentGain}%</Typography>
            <Typography variant="body1">Current Value: ${position.currentValue}</Typography>
          </CardContent>
          <CardActions>
            <UpdatePositionIndustryDialog sectors={sectors} positionId={position.id} />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};
