"use client";
import { Position } from "../../lib/models/position.model";
import { UploadCsvComponent } from "../../components/UploadCsvComponent";
import { PositionsTable } from "../../components/PositionsTable";
import DeleteAllPositions from "../../components/buttons/DeleteAllPositionsButton";
import { useEffect, useState } from "react";
import Spinner from "../../components/progress/Spinner";

const PositionsPage = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchPositions = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/position", {
        method: "GET",
      });
      const positionsResult: { result: Position[]; error: any } = await response.json();
      setPositions(positionsResult.result || []);
    } finally {
      setLoading(false);
    }
  };
  const handleUploadComplete = async () => {
    await fetchPositions(); // Refresh the positions
  };

  const handleDeletePositions = async () => {
    setPositions([]);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Spinner />
      </div>
    );
  }
  if (positions != null && positions.length > 0)
    return (
      <div>
        <PositionsTable positions={positions} />
        <DeleteAllPositions onDelete={handleDeletePositions} />
      </div>
    );
  return <UploadCsvComponent onUploadComplete={handleUploadComplete} />;
};

export default PositionsPage;
