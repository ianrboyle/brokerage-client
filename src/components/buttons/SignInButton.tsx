"use client";
import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex items-center space-x-4 text-xl" color="text.secondary">
        <Typography color="text.secondary">Welcome {session.user.email}</Typography>
        <Typography color="text.secondary">
          <Link href={"/api/auth/signout"}>Sign Out</Link>
        </Typography>
      </div>
    );

  return (
    <div className="flex items-center space-x-4 text-xl">
      <Typography color="text.secondary">
        <Button variant="outlined" component={Link} href="/signup">
          Sign Up
        </Button>
      </Typography>
      <Typography color="text.secondary">
        <Button variant="outlined" component={Link} href="/api/auth/signin">
          Sign In
        </Button>
      </Typography>
    </div>
  );
};

export default SignInButton;
