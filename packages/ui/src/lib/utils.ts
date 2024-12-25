import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQRData({
  url,
  fgColor,
  hideLogo,
  logo,
  margin,
}: {
  url: string;
  fgColor?: string;
  hideLogo?: boolean;
  logo?: string;
  margin?: number;
}) {
  return {
    value: `${url}?qr=1`,
    bgColor: "#ffffff",
    fgColor,
    size: 1024,
    level: "Q", // QR Code error correction level: https://blog.qrstuff.com/general/qr-code-error-correction
    hideLogo,
    margin,
    ...(!hideLogo && {
      imageSettings: {
        src: logo || "https://assets.dub.co/logo.png",
        height: 256,
        width: 256,
        excavate: true,
      },
    }),
  };
}

// capitalize first character of each word in a string
export function capitalize(str?: string | null) {
  if (!str || typeof str !== "string") return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
