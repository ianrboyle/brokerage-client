"use client";
import * as React from "react";
import { Box, Divider, Paper, Typography, styled, TextField, CircularProgress, Button } from "@mui/material";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import paths from "../paths";
import Bolt from "@mui/icons-material/Bolt";
import { Sector } from "../lib/models/sector.model";
import DropdownWithSearch from "./SectorSelectDropdown";
import SectorSelectDropdown from "./SectorSelectDropdown";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);
export interface CreateIndustryDto {
  industryName: string;
  sector: Sector;
}

interface CreateNewIndustryCardProps {
  sectors: Sector[];
}

export const CreateNewIndustryCard: React.FC<CreateNewIndustryCardProps> = ({ sectors }) => {
  const router = useRouter();
  const [industryName, setIndustryName] = useState<string>("");
  const [sector, setSector] = useState<Sector | null>(null);
  const [isSubmitButtonEnabled, setSubmitButtonEnabled] = useState<boolean>(true);
  const handleSectorSelection = (event: React.ChangeEvent<{}>, value: Sector | null) => {
    setSector(value);
    // Handle the selected value
  };
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setSubmitButtonEnabled(false);
      const industryData: CreateIndustryDto = {
        industryName: industryName,
        sector: sector ?? { id: -1, sectorName: "" },
      };
      const formData = new FormData();
      formData.append("industryData", JSON.stringify(industryData));
      const response = await fetch("api/industry", {
        method: "POST",
        body: formData,
      });

      router.push(paths.home());
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
                  <h1>Select Sector</h1>
                  <SectorSelectDropdown
                    options={sectors}
                    onChange={handleSectorSelection}
                    renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    variant="standard"
                    id="industryName"
                    label="New Industry"
                    sx={{ minWidth: { xs: "80%", md: "50%" } }}
                    onChange={(e) => setIndustryName(e.target.value)}
                    value={industryName}
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
