import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request: NextRequest) {
  try {
    const { amount, destinationAccountId } = await request.json();

    if (!amount || !destinationAccountId) {
      return NextResponse.json(
        { error: "amount and destinationAccountId are required" },
        { status: 400 }
      );
    }

    // 1% platform fee
    const applicationFeeAmount = Math.round(Number(amount) * 0.01);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      transfer_data: {
        destination: destinationAccountId,
      },
      // Optional but recommended to align liability and fees
      on_behalf_of: destinationAccountId,
      application_fee_amount: applicationFeeAmount,
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json(
      { error: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
