import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mágica do TCC | Escrita Acadêmica Inteligente",
  description: "Crie seu TCC nas normas ABNT com ajuda de Inteligência Artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
