"use client";

import { PropsWithChildren } from "react";

import { ImageKitProvider as NextImageKitProvider } from "imagekitio-next";

import { authenticator, publicKey, urlEndpoint } from "~/lib/image-kit";

const ImageKitProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextImageKitProvider
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
      publicKey={publicKey}
    >
      {children}
    </NextImageKitProvider>
  );
};

export default ImageKitProvider;
