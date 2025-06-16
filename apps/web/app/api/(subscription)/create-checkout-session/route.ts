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

    const line_item =
      priceId !== "0"
        ? {
            price: priceId,
            quantity: 1,
          }
        : {
            price_data: {
              unit_amount: 0, // Set to 0 for free plans, or use the actual price amount
              currency: "usd", // Change to your desired currency
              product_data: {
                name: data.plan,
                description: `Subscription for ${data.plan} plan`,
              },
            },
          };

    console.log("Creating Stripe Checkout Session with line item:", line_item);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        priceId !== "0"
          ? {
              price: priceId,
              quantity: 1,
            }
          : {
              price_data: {
                unit_amount: 0, // Set to 0 for free plans, or use the actual price amount
                currency: "usd", // Change to your desired currency
                product_data: {
                  name: data.plan,
                  description: `Subscription for Free plan`,
                },
              },
            },
      ],
      success_url: `${APP_URL}/subscriptions/complete?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/subscriptions/cancelled`,
      metadata: data,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return handleAndReturnNextErrorResponse(error);
  }
}
