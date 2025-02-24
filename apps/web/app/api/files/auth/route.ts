import { NextResponse } from "next/server";

import ImageKit from "imagekit";

import { privateKey, publicKey, urlEndpoint } from "~/lib/image-kit";

const imageKit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export const GET = () => {
  return NextResponse.json(imageKit.getAuthenticationParameters());
};
