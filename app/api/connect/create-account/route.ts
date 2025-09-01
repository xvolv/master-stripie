import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { country = "US", email } = body || {};

    const account = await stripe.accounts.create({
      type: "express",
      country,
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    return NextResponse.json({ accountId: account.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "failed to create account" },
      { status: 500 }
    );
  }
}
