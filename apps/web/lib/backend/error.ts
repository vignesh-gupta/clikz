import { NextResponse } from "next/server";

import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import { ZodOpenApiResponseObject } from "zod-openapi";

import { capitalize } from "@clikz/ui/lib/utils";

import z from "~/lib/zod";

type PlanProps = "free" | "pro" | "business" | "enterprise";

export const ErrorCode = z.enum([
  "bad_request",
  "not_found",
  "internal_server_error",
  "unauthorized",
  "forbidden",
  "rate_limit_exceeded",
  "invite_expired",
  "invite_pending",
  "exceeded_limit",
  "conflict",
  "unprocessable_entity",
]);

type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 410 | 422 | 429 | 500;

const errorCodeToHttpStatus: Record<
  z.infer<typeof ErrorCode>,
  ErrorStatusCode
> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  invite_pending: 409,
  invite_expired: 410,
  unprocessable_entity: 422,
  rate_limit_exceeded: 429,
  internal_server_error: 500,
};

export const httpStatusToErrorCode = Object.fromEntries(
  Object.entries(errorCodeToHttpStatus).map(([code, status]) => [status, code])
) as Record<number, z.infer<typeof ErrorCode>>;

const speakeasyErrorOverrides: Record<z.infer<typeof ErrorCode>, string> = {
  bad_request: "BadRequest",
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  exceeded_limit: "ExceededLimit",
  not_found: "NotFound",
  conflict: "Conflict",
  invite_pending: "InvitePending",
  invite_expired: "InviteExpired",
  unprocessable_entity: "UnprocessableEntity",
  rate_limit_exceeded: "RateLimitExceeded",
  internal_server_error: "InternalServerError",
};

const ErrorSchema = z.object({
  error: z.object({
    code: ErrorCode.openapi({
      description: "A short code indicating the error code returned.",
      example: "not_found",
    }),
    message: z.string().openapi({
      description: "A human readable error message.",
      example: "The requested resource was not found.",
    }),
  }),
});

export type ErrorResponse = z.infer<typeof ErrorSchema>;
export type ErrorCodes = z.infer<typeof ErrorCode>;

export class ClikzApiError extends Error {
  public readonly code: z.infer<typeof ErrorCode>;

  constructor({
    code,
    message,
  }: {
    code: z.infer<typeof ErrorCode>;
    message: string;
  }) {
    super(message);
    this.code = code;
  }
}

export function fromZodError(error: ZodError): ErrorResponse {
  return {
    error: {
      code: "unprocessable_entity",
      message: generateErrorMessage(error.issues, {
        maxErrors: 1,
        delimiter: {
          component: ": ",
        },
        path: {
          enabled: true,
          type: "objectNotation",
          label: "",
        },
        code: {
          enabled: true,
          label: "",
        },
        message: {
          enabled: true,
          label: "",
        },
      }),
    },
  };
}

export function handleApiError(error: any): ErrorResponse & { status: number } {
  console.error("API error occurred", error.message);

  // Zod errors
  if (error instanceof ZodError) {
    return {
      ...fromZodError(error),
      status: errorCodeToHttpStatus.unprocessable_entity,
    };
  }

  // DubApiError errors
  if (error instanceof ClikzApiError) {
    return {
      error: {
        code: error.code,
        message: error.message,
      },
      status: errorCodeToHttpStatus[error.code],
    };
  }

  // Prisma record not found error
  if (error.code === "P2025") {
    return {
      error: {
        code: "not_found",
        message:
          error?.meta?.cause ||
          error.message ||
          "The requested resource was not found.",
      },
      status: 404,
    };
  }

  // Fallback
  // Unhandled errors are not user-facing, so we don't expose the actual error
  return {
    error: {
      code: "internal_server_error",
      message:
        "An internal server error occurred. Please contact our support if the problem persists.",
    },
    status: 500,
  };
}

export function handleAndReturnNextErrorResponse(
  err: unknown,
  headers?: Record<string, string>
) {
  const { error, status } = handleApiError(err);
  return NextResponse.json<ErrorResponse>({ error }, { headers, status });
}

export function handleAndReturnAPIErrorResponse(
  err: unknown,
  headers?: Record<string, string>
) {
  const { error, status: errorStatus } = handleApiError(err);

  const status = errorStatus as ErrorStatusCode;

  return {
    json: { data: null, error },
    status,
    headers,
  };
}

export const errorSchemaFactory = (
  code: z.infer<typeof ErrorCode>,
  description: string
): ZodOpenApiResponseObject => {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          "x-speakeasy-name-override": speakeasyErrorOverrides[code],
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  enum: [code],
                  description:
                    "A short code indicating the error code returned.",
                  example: code,
                },
                message: {
                  "x-speakeasy-error-message": true,
                  type: "string",
                  description:
                    "A human readable explanation of what went wrong.",
                  example: "The requested resource was not found.",
                },
                doc_url: {
                  type: "string",
                  description:
                    "A link to our documentation with more details about this error code",
                },
              },
              required: ["code", "message"],
            },
          },
          required: ["error"],
        },
      },
    },
  };
};

export const exceededLimitError = ({
  plan,
  limit,
  type,
}: {
  plan: PlanProps;
  limit: number;
  type: "clicks" | "links" | "AI" | "domains" | "tags" | "users" | "folders";
}) => {
  return `You've reached your ${
    type === "links" || type === "AI" ? "monthly" : ""
  } limit of ${limit} ${
    limit === 1 ? type.slice(0, -1) : type
  } on the ${capitalize(plan)} plan. Please upgrade to add more ${type}.`;
};
