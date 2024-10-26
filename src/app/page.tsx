'use client';

import FeaturesSection from "@/components/features-section";
import InsuranceComparison from "@/components/InsuraceComparison";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentPage({ amount }: { amount: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('api/create-order', { method: 'POST' });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseInt(amount) * 100,
        currency: 'INR',
        name: 'Insurance',
        description: 'Payment for Insurance',
        order_id: data.orderId,
        handler: function (response: any) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: user?.firstName,
          email: user?.emailAddresses[0].emailAddress,
          contact: user?.phoneNumbers[0].phoneNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-gray-800">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Payment Page</h1>
        <p className="text-lg mb-4">
          Amount to be paid: <span className="font-semibold">₹{amount} INR</span>
        </p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 font-semibold"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <InsuranceComparison />
      <FeaturesSection />
    </div>
  );
}
