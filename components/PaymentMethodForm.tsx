"use client";

import { useContext, useState, useEffect } from "react";

import { CartContext } from "@/context/Cart";

import { ActionTypes } from "@/enums/ActionTypes";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

function PaymentMethodForm() {
  const methods = ["Gateway", "Offline Payment"];

  const [selectedMethod, setSelectedMethod] = useState<string>("Gateway");

  const {
    state: {
      cart: { paymentMethod },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedMethod) return toast.error("Select Your Payment Method.");

    dispatch({ type: ActionTypes.PAYMENT_METHOD, payload: selectedMethod });

    toast.success("Payment Method Added.");

    router.push("/place-order");
  }

  useEffect(() => {
    setSelectedMethod(paymentMethod);
  }, [paymentMethod]);

  return (
    <div className="bg-slate-300 justify-self-center self-center p-7 rounded-lg">
      <form onSubmit={submitHandler}>
        <h2 className="mb-2">Payment Method</h2>
        {methods.map((item) => (
          <div key={item} className="space-x-1">
            <input
              type="radio"
              id={item}
              name="payment-method"
              checked={selectedMethod === item}
              onChange={() => setSelectedMethod(item)}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
        <div className="flex justify-center gap-x-3">
          <button
            type="button"
            onClick={() => router.push("/shipping")}
            className="btn bg-red-400 hover:bg-red-500 hover:text-white transition-all mt-3"
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn bg-green-400 hover:bg-green-500 hover:text-white transition-all mt-3"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodForm;
