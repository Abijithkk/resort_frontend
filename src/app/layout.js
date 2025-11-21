import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Paradise Retreat - Luxury Resort",
  description: "Experience luxury and tranquility at Paradise Retreat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
