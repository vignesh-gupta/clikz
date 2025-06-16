import { APP_URL } from "../constants";

type StripeSession = {
  id: string;
  payment_status: string;
  metadata: {
    workspaceSlug: string;
    plan: string;
  };
};

type StripeSessionResponse =
  | {
      success: boolean;
      session: StripeSession;
      error?: null;
    }
  | {
      success: boolean;
      error: any;
      session?: null;
    };

export const getStripeSessionDetails = async (sessionId: string) => {
  console.log("Checking subscription session with ID:", sessionId);

  if (!sessionId) {
    return {
      success: false,
      error: "Session ID is required",
    };
  }

  try {
    const response = await fetch(`${APP_URL}/api/check-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) {
      throw new Error("Failed to check session");
    }

    const data = await response.json();

    return data as StripeSessionResponse;
  } catch (error) {
    console.error("Error checking subscription session:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
