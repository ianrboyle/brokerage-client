"use client";

import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "./ThemeRegistry/ThemeRegistry";

export function Providers({ children }: { children: any }) {
  return (
    <ThemeRegistry>
      <SessionProvider>{children}</SessionProvider>
    </ThemeRegistry>
  );
}
