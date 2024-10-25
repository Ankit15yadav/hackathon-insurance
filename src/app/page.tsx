'use client';

import FeaturesSection from "@/components/features-section";
import InsuranceComparison from "@/components/InsuraceComparison";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any,
  }
}

export function PaymentPage({ amount }: { amount: number }) {
  // const AMOUNT = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useUser();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {

      const response = await fetch('api/create-order', { method: 'POST' });
      const data = await response.json();

      // initialise razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
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
        }
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.log(error);
    }
    finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className=" flex  dark:bg-gray-700 flex-col items-center justify-center min-h-screen bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-6 dark:bg-gray-800 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment page</h1>
        <p className="mb-4">
          Amount to be paid: ₹{amount} INR
        </p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className=" px-4 py-2 bg-blue-500 text-white  rounded hover:bg-blue-600 disabled:bg-gray-600"
        >
          {
            isProcessing ? "Processing..." : "Pay Now"
          }
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="">
      <InsuranceComparison />
      <FeaturesSection />
    </div>
  );
}
