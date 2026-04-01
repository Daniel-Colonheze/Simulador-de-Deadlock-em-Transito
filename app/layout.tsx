import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/contexts/LocaleContext";
import type { Locale } from "@/i18n/translations";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { StarsBackground } from "@/components/StarsBackground";

export const metadata: Metadata = {
  title: "Deadlock Traffic Simulator",
  description:
    "Interactive simulation of the deadlock problem in concurrent systems using a traffic scenario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const initialLocale: Locale = localeCookie === "en" ? "en" : "pt";

  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme: "light" | "dark" =
    themeCookie === "light" || themeCookie === "dark" ? themeCookie : "light";

  return (
    <html lang={initialLocale === "pt" ? "pt-BR" : "en"} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <StarsBackground />
        <div className="relative z-10">
          <LocaleProvider initialLocale={initialLocale}>
            <AppProviders initialTheme={initialTheme}>
              {children}
            </AppProviders>
          </LocaleProvider>
        </div>
      </body>
    </html>
  );
}