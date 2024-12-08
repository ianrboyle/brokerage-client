"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SectorSelectDropdown from "./SectorSelectDropdown";
import { Sector } from "../lib/models/sector.model";
import { useState, useEffect } from "react";
import { Industry } from "../lib/models/industry.model";
import IndustrySelectDropdown from "./IndustrySelectDropdown";
import { useSession } from "next-auth/react";
import { UpdatePositionIndustry } from "../lib/models/update-position-industry.model";
import Spinner from "./progress/Spinner";

interface UpdatePositionIndustryDialogProps {
  sectors: Sector[];
  positionId: number;
  onUpdateIndustryDetails: (sectorName: string, industryName: string, sectorId: number, industryId: number) => void;
}
export const UpdatePositionIndustryDialog: React.FC<UpdatePositionIndustryDialogProps> = ({
  sectors,
  positionId,
  onUpdateIndustryDetails,
}) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [sector, setSector] = useState<Sector | null>(null);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const updatePositionIndustry: UpdatePositionIndustry = {
          industryId: industry?.industryId,
          positionId: positionId,
        };

        const formData = new FormData();
        formData.append("updatePositionIndustryData", JSON.stringify(updatePositionIndustry));
        const response = await fetch("/api/industry", {
          method: "PATCH",
          body: formData,
        });
        if (response.ok) {
          if (sector) {
            onUpdateIndustryDetails(sector.sectorName, industry.industryName, sector.id, industry.industryId);
            setSector(null);
            setIndustries([]);
            setIndustry(null);
          } else {
            console.error("Error processing update");
          }
          handleClose();
        } else {
          console.error("Failed to update data");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const getIndustries = async (sectorId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/industries/${sectorId}`);
      if (response.ok) {
        const data: {
          result: Industry[];
          error: any;
        } = await response.json();
        if (!data.error) {
          setIndustries(data.result);
        }
      } else {
        console.error("Failed to fetch industries:", response.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <Button onClick={update} type="submit" disabled={!industry || loading}>
            {loading ? <Spinner /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
