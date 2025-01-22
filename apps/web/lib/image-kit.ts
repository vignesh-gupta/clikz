/* eslint-disable turbo/no-undeclared-env-vars */
import { BASE_URL } from "./constants";

export const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
export const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

export const authenticator = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/files/auth`);

    console.log("ImageKit authentication res", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    console.log("ImageKit authentication successful");

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error?.message}`);
  }
};
