"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log(session);
  if (session && session.user)
    return (
      <div>
        <p>Welcome {session.user.email}</p>
        <Link href={"/api/auth/signout"}>Sign Out</Link>
      </div>
    );

  return (
    <div>
      <Link href={"/signup"}>Sign Up</Link>
      <Link href={"/api/auth/signin"}>Sign In</Link>
    </div>
  );
};

export default SignInButton;
