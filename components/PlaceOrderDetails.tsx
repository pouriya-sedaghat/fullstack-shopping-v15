"use client";

import { useContext, useEffect, useState } from "react";

import { CartContext } from "@/context/Cart";

import Image from "next/image";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { toast } from "react-toastify";
import { Product } from "@/interface/Product";
import { ShippingData } from "@/interface/ShippingData";
import { PaymentMethod } from "@/types/PaymentMethod";

function PlaceOrderDetails() {
  const {
    state: {
      cart: { cartItems, shippingData, paymentMethod },
    },
  } = useContext(CartContext);

  const [cart, setCart] = useState<{
    cartItems: Product[];
    shippingData: ShippingData;
    paymentMethod: PaymentMethod;
  }>({
    cartItems: [],
    shippingData: { fullName: "", postalCode: "", address: "" },
    paymentMethod: "",
  });

  const router = useRouter();

  async function addOrderHandler() {
    const newCartitems = cartItems.map((item) => ({
      ...item,
      subtotal: item.price * item.quantity!,
    }));

    const reqBody = {
      orderItems: newCartitems,
      shippingData,
      paymentMethod,
    };

    const response = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    console.log(result);

    Cookies.remove("cart");

    toast.success("Order Placed.");

    router.push("/completed-order");
  }

  useEffect(() => {
    setCart({ cartItems, shippingData, paymentMethod });
  }, [cartItems, shippingData, paymentMethod]);

  return (
    <div className="grid grid-cols-[4fr,1fr] gap-x-4">
      <div className="space-y-4 bg-slate-200 p-5 rounded-md">
        <div>
          <h2 className="text-gray-800">Shipping Data</h2>
          <table className="my-2 w-full text-center text-sm text-white rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="py-3">Full Name</th>
                <th className="py-3">Postal Code</th>
                <th className="py-3">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800 hover:bg-gray-600 transition-all">
                <td className="py-4">{cart.shippingData.fullName}</td>
                <td className="py-4">{cart.shippingData.postalCode}</td>
                <td className="py-4">{cart.shippingData.address}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn bg-slate-500 text-white hover:bg-slate-600 transition-all"
            onClick={() => router.push("/shipping")}
          >
            Edit
          </button>
        </div>
        <div>
          <h2 className="text-gray-800">Payment Method</h2>
          <table className="my-2 w-full text-center text-sm text-white rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="py-3">Selected Method</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800 hover:bg-gray-600 transition-all">
                <td className="py-4">{cart.paymentMethod}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="btn bg-slate-500 text-white hover:bg-slate-600 transition-all"
            onClick={() => router.push("/payment-method")}
          >
            Edit
          </button>
        </div>
        <div>
          <h2 className="text-gray-800">Cart</h2>
          <table className="my-2 w-full text-sm text-white rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="px-8 py-3">Item</th>
                <th className="px-8 py-3">Quantity</th>
                <th className="px-8 py-3">Price</th>
                <th className="px-8 py-3">Subtotal</th>
                <th className="px-8 py-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map((item, index) => (
                <tr
                  key={item._id as string}
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 transition-all"
                >
                  <td className="flex justify-center items-center gap-x-5 px-6 py-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={40}
                      height={40}
                      priority
                    />
                    <span>{item.title}</span>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toLocaleString()} IRR</td>
                  <td>{(item.quantity! * item.price).toLocaleString()} IRR</td>
                  {index === 0 && (
                    <td rowSpan={cart.cartItems.length}>
                      {cart.cartItems
                        .reduce(
                          (acc, cur) => acc + cur.quantity! * cur.price,
                          0
                        )
                        .toLocaleString()}{" "}
                      IRR
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn bg-slate-500 text-white hover:bg-slate-600 transition-all"
            onClick={() => router.push("/cart")}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="bg-gray-800 h-1/5 flex justify-center items-center rounded-md">
        <button
          className="btn bg-white hover:bg-slate-200 transition-all"
          onClick={addOrderHandler}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderDetails;
