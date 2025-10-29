import type { Metadata } from "next";
import { Lora, Parisienne } from "next/font/google";
import "./globals.css";
import { Header } from "@/shared/components/ui/Header/Header";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: "My Wedding",
  description: "Invitaciones digitales para tu boda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${lora.variable} ${parisienne.variable} antialiased bg-white`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
