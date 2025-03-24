import type { ErrorCodes } from "./error";

type ClikzAPIResponse<T> = {
  data: T;
  error: null;
};

export type ClikzAPIErrorResponse = {
  data: null;
  error: {
    code: ErrorCodes;
    message: string;
  };
};

export function generateAPIResponse<T>(data: T): ClikzAPIResponse<T> {
  return {
    data,
    error: null,
  };
}

export function generateAPIErrorResponse(
  code: ErrorCodes,
  message: string
): ClikzAPIErrorResponse {
  return {
    data: null,
    error: {
      code,
      message,
    },
  };
}
