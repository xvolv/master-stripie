import React from "react";
import Link from "next/link";

const Page = ({ searchParams }: { searchParams: { amount: string } }) => {
  const amount = searchParams?.amount || "0.00";

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-6">
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
      <p className="text-gray-600 mt-2">
        You have successfully sent{" "}
        <span className="font-semibold">${amount}</span>.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page;
