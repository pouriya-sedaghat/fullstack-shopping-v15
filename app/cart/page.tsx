"use client";

import { useContext } from "react";

import { CartContext } from "@/context/Cart";

import CartItem from "@/components/CartItem";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

function Cart() {
  const {
    state: {
      cart: { cartItems },
    },
  } = useContext(CartContext);

  const router = useRouter();

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-10 grid grid-cols-4 gap-4">
        {cartItems.map((item) => (
          <CartItem key={item.slug} product={item} />
        ))}
      </div>
      <div className="col-span-2 text-center bg-slate-100 p-3 rounded-lg h-fit space-y-2">
        <p>
          TotalPrice :{" "}
          <span className="block">
            {cartItems
              .reduce((acc, cur) => acc + cur.quantity! * cur.price, 0)
              .toLocaleString()}{" "}
            IRR
          </span>
        </p>
        <button
          className="btn bg-neutral-800 text-white"
          onClick={() => router.push("login?redirect=/shipping")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
