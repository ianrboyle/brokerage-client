"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SectorSelectDropdown from "./SectorSelectDropdown";
import { Sector } from "../lib/models/sector.model";
import { useState, useEffect } from "react";
import { getIndustriesBySectorId } from "../server-utils/get-industries-by-sector-id";
import { Industry } from "../lib/models/industry.model";
import IndustrySelectDropdown from "./IndustrySelectDropdown";
import { useSession } from "next-auth/react";
import { UpdatePositionIndustry } from "../lib/models/update-position-industry.model";

interface UpdatePositionIndustryDialogProps {
  sectors: Sector[];
  positionId: number;
}
export const UpdatePositionIndustryDialog: React.FC<UpdatePositionIndustryDialogProps> = ({ sectors, positionId }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [sector, setSector] = useState<Sector | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSectorSelection = (event: React.ChangeEvent<{}>, value: Sector | null) => {
    setSector(value);
  };
  const handleIndustrySelection = (event: React.ChangeEvent<{}>, value: Industry | null) => {
    setIndustry(value);
  };
  const update = async () => {
    if (industry) {
      const updatePositionIndustry: UpdatePositionIndustry = {
        industryId: industry?.industryId,
        positionId: positionId,
      };

      const formData = new FormData();
      formData.append("updatePositionIndustryData", JSON.stringify(updatePositionIndustry));
      const response = await fetch("../api/industry", {
        method: "PATCH",
        body: formData,
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to update data");
      }
    }
  };

  useEffect(() => {
    const getIndustries = async (sectorId: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks

      const response = await getIndustriesBySectorId(sectorId, session?.jwt);
      setIndustries(response.result as Industry[]);
    };
    if (sector && sector.id != null) {
      getIndustries(sector.id);
    } else {
      setIndustries([]);
    }
  }, [sector, session?.jwt]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update Position Sector and Industry
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Update Sector</DialogTitle>
        <DialogContent>
          <SectorSelectDropdown
            options={sectors}
            onChange={handleSectorSelection}
            renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
          />
          {industries && industries.length > 0 ? (
            <IndustrySelectDropdown
              options={industries}
              onChange={handleIndustrySelection}
              renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={update} type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
