"use client";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { parseCsvFile } from "../lib/formatCsvPositions";
import { addMultiplePositions } from "../server-utils/add-multiple-positions";

export const UploadCsvComponent = () => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results: Papa.ParseResult<any>) => {
          const parsedData = parseCsvFile(results.data);
          // addPositions(parsedData.splice(21, 22));
          const formData = new FormData();
          formData.append("positions", JSON.stringify(parsedData));
          const res = await fetch("/api/position", {
            method: "POST",
            body: formData,
          });
        },
      });
    }
  };

  return (
    <div>
      <h4 className="page-header mb-4">Upload a CSV</h4>
      {/* <div className="mb-4">
        <input ref={inputRef} disabled={uploading} type="file" className="form-control" />
      </div>
      <button onClick={handleUploadCSV} disabled={uploading} className="btn btn-primary">
        {uploading ? "Uploading..." : "Upload"}
      </button> */}
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
};
