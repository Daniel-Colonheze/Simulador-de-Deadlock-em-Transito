// providers/AppProviders.tsx
"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";

export function AppProviders({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: "light" | "dark";
}) {
  return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>;
}