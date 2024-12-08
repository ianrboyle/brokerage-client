"use client";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
interface DeletePositionsProps {
  onDelete: () => void;
}
export const DeleteAllPositions: React.FC<DeletePositionsProps> = ({ onDelete }) => {
  const { data: session } = useSession();
  const handleDeleteAllPositions = async () => {
    const confirmed = window.confirm("Are you sure you want to delete all positions?");
    if (confirmed) {
      const response = await fetch("api/position", {
        method: "DELETE",
      });
      onDelete();
    }
  };
  if (session && session.user)
    return (
      <div className="flex items-center space-x-4 text-xl">
        <Typography>
          <Button variant="outlined" color="error" onClick={handleDeleteAllPositions}>
            Delete All Positions
          </Button>
        </Typography>
      </div>
    );

  return null;
};

export default DeleteAllPositions;
