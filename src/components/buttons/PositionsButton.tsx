"use client";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const PositionsButton = () => {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <div className="flex items-center space-x-4 text-xl" color="text.secondary">
        <Typography color="text.secondary">
          <Link href="/sectors">Sector Allocation</Link>
        </Typography>
        <Typography color="text.secondary">
          <Link href="/positions/new">Create New Position</Link>
        </Typography>
      </div>
    );

  return null;
};

export default PositionsButton;
