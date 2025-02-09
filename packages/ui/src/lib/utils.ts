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

export function capitalizeFirstLetter(str?: string | null) {
  if (!str || typeof str !== "string") return str;

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalize(str?: string | null) {
  if (!str || typeof str !== "string") return str;

  return str
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");
}

export function generateCUID() {
  // Length = 25 characters & only lowercase letters and numbers

  return "xxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, () =>
    ((Math.random() * 36) | 0).toString(36),
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/\//g, "-");
}
