/* eslint-disable turbo/no-undeclared-env-vars */
import { NextResponse } from "next/server";

import ImageKit from "imagekit";

import { privateKey, publicKey, urlEndpoint } from "~/lib/image-kit";

const imageKit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey || "private_samplekeytofixci",
  urlEndpoint: urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
