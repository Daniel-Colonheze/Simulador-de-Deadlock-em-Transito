import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simulador de Deadlock em Trânsito",
  description: "Simulação interativa do problema de deadlock em sistemas concorrentes usando um cenário de trânsito",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
