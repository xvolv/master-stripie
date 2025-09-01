"use client";
import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function Home() {
  const amount = 49.99;
  return (
    <main className="max-w6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-textrabold mb-2">sonny</h1>
        <h2 className="text-2xl">
          {" "}
          has requiested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount,100),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={convertToSubcurrency(amount,100)} />
      </Elements>
    </main>
  );
}
