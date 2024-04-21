"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const PositionsButton = () => {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <div className="space-x-4 text-xl">
        <Link href="/sectors">Sector Allocation</Link>
        <Link href="/positions/new">Create New Position</Link>
      </div>
    );

  return null;
};

export default PositionsButton;
