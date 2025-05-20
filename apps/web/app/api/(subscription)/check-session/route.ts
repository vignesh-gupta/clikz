import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import {
  ClikzApiError,
  handleAndReturnNextErrorResponse,
} from "~/lib/backend/error";
import { db } from "~/lib/db";
import { stripeMetadataSchema } from "~/lib/zod/schemas/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log(session);
    if (session.payment_status !== "paid") {
      throw new ClikzApiError({
        code: "internal_server_error",
        message: "Session is not paid.",
      });
    }

    const { success, data } = stripeMetadataSchema.safeParse(session.metadata);

    if (!success) {
      throw new ClikzApiError({
        code: "bad_request",
        message: "Invalid session",
      });
    }

    const { workspaceSlug, plan } = data;

    await db.workspace.update({
      where: { slug: workspaceSlug },
      data: {
        plan,
      },
    });

    return NextResponse.json({ session });
  } catch (error) {
    return handleAndReturnNextErrorResponse(error);
  }
}
