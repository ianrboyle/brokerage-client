import { Grid, Paper, styled } from "@mui/material";
import { PositionCard } from "../../../components/PositionCard";
import { getPositionById } from "../../../server-utils/get-positions-by-id";
import { getSectors } from "../../../server-utils/get-sectors";
import { Sector } from "../../../lib/models/sector.model";
import { getServerSession } from "next-auth";

const fetchData = async (context: { params: { positionId: string } }) => {
  return context.params.positionId;
};

const PositionPage = async (context: { params: { positionId: string } }) => {
  const positionId = await fetchData(context);
  const response = await getPositionById(positionId);
  const position = response.result as Position;
  const sectorResponse = await getSectors();
  const sectors = sectorResponse.result as Sector[];

  if (position != null)
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <PositionCard position={position} sectors={sectors} />
          </Grid>
        </Grid>
      </div>
    );
  return null;
};

export default PositionPage;
