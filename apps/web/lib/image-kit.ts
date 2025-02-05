/* eslint-disable turbo/no-undeclared-env-vars */
import { APP_URL } from "./constants";
import { env } from "./env";

export const urlEndpoint = env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
export const publicKey = env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
export const privateKey = env.IMAGEKIT_PRIVATE_KEY;

export const authenticator = async () => {
  try {
    const response = await fetch(`${APP_URL}/api/files/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error?.message}`);
  }
};
