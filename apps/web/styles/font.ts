import { Inter, Urbanist } from "next/font/google";
import localFont from "next/font/local";

import { GeistMono } from "geist/font/mono";

export const inter = Inter({ subsets: ["latin"] });
export const urbanist = Urbanist({
  subsets: ["latin"],
});

export const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

// export const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   weight: "400",
//   display: "swap",
//   style: "normal",
//   subsets: ["latin"],
// });

export const geistMono = GeistMono;
