import { Vercel } from "@vercel/sdk";
import "server-only";

export const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

export const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID!;
