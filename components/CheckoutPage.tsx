"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const CheckoutPage = ({ amount, sellerAccountId }: { amount: number; sellerAccountId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount, 100),
        destinationAccountId: sellerAccountId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [amount, sellerAccountId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message || "An unexpected error occured.");
    } else {
    }

    setLoading(false);
  };
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex flex-col items-center justify-center h-40 space-y-3">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading text */}
        <p className="text-sm font-mono text-gray-500">
          processing<span className="animate-pulse">...</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        type="submit"
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutPage;
