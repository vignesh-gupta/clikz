import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

import { APP_URL } from "@clikz/utils/constants";

import { auth } from "~/auth";
import {
  ClikzApiError,
  handleAndReturnNextErrorResponse,
} from "~/lib/backend/error";
import { stripeMetadataSchema } from "~/lib/zod/schemas/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const authSession = await auth();

    if (!authSession || !authSession.user) {
      throw new ClikzApiError({
        code: "unauthorized",
        message: "Please log in to continue.",
      });
    }

    const body = await request.json();

    const { success, data, error } = stripeMetadataSchema.safeParse(body);

    if (!success) {
      throw new ClikzApiError({
        code: "bad_request",
        message: error.message,
      });
    }

    const { priceId, userId } = data;

    if (authSession.user.id !== userId) {
      throw new ClikzApiError({
        code: "unauthorized",
        message: "You are not authorized to create this session.",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/subscriptions/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/`,
      metadata: data,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return handleAndReturnNextErrorResponse(error);
  }
}
