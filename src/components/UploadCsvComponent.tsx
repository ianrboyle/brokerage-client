"use client";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { parseCsvFile } from "../lib/formatCsvPositions";
import { addMultiplePositions } from "../server-utils/add-multiple-positions";
import { Button, Typography } from "@mui/material";

interface UploadCsvComponentProps {
  onUploadComplete: () => void;
}
export const UploadCsvComponent: React.FC<UploadCsvComponentProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results: Papa.ParseResult<any>) => {
          const parsedData = parseCsvFile(results.data);
          const formData = new FormData();
          formData.append("positions", JSON.stringify(parsedData));
          const res = await fetch("/api/position", {
            method: "POST",
            body: formData,
          });
          onUploadComplete();
        },
      });
    }
  };

  return (
    <div>
      <Typography color="text.secondary">
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <Button variant="outlined" component="span">
            Upload Your Portfolio
          </Button>
        </label>
        <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileUpload} />
      </Typography>
    </div>
  );
};
