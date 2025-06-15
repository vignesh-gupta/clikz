import { APP_URL } from "../constants";

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

    console.log("Received response from check-session:", data);

    if (data.success) {
      return {
        success: true,
        session: data.session,
      };
    } else {
      return {
        success: false,
        error: data.error || "Unknown error",
      };
    }
  } catch (error) {
    console.error("Error checking subscription session:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
