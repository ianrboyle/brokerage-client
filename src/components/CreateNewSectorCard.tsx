"use client";
import * as React from "react";
import { Box, Divider, Paper, Typography, styled, TextField, CircularProgress, Button } from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import paths from "../paths";
import Bolt from "@mui/icons-material/Bolt";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
export interface CreateSectorDto {
  sectorName: string;
}
export const CreateNewSectorCard: React.FC = () => {
  const router = useRouter();
  const [sectorName, setSectorName] = useState<string>("");
  const [isSubmitButtonEnabled, setSubmitButtonEnabled] = useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSubmitButtonEnabled(false);
      const sectorData: CreateSectorDto = {
        sectorName: sectorName,
      };
      const formData = new FormData();
      formData.append("sectorData", JSON.stringify(sectorData));
      const response = await fetch("api/sector", {
        method: "POST",
        body: formData,
      });

      router.push(paths.createIndustry());
    } catch (error) {
      // ErrorHandlers.handleError(error);
      console.error(error);
    } finally {
      setSubmitButtonEnabled(true);
    }
  };
  return (
    <Box>
      <Grid item display="flex" xs={12} justifyContent="center" alignItems="center">
        <Box textAlign="center">
          <Typography variant="h5" style={{ margin: 10 }}>
            Create a new sector
          </Typography>

          <Box display="flex" flexDirection="column">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={12} md={12}>
                  <TextField
                    variant="standard"
                    id="sectorName"
                    label="New Sector"
                    sx={{ minWidth: { xs: "80%", md: "50%" } }}
                    onChange={(e) => setSectorName(e.target.value)}
                    value={sectorName}
                    required
                  />
                </Grid>
              </Grid>

              <Divider style={{ margin: 15 }}></Divider>
              <Button
                type="submit"
                variant="contained"
                startIcon={isSubmitButtonEnabled ? <Bolt /> : <CircularProgress />}
                fullWidth
                sx={{ maxWidth: { xs: "80%", md: "30%" } }}
                disabled={!isSubmitButtonEnabled}
              >
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
