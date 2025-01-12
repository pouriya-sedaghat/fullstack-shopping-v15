"use client";

import { Product } from "@/interface/Product";

import { useContext } from "react";

import { CartContext } from "@/context/Cart";

import { useRouter } from "next/navigation";

import { ActionTypes } from "@/enums/ActionTypes";

import { toast } from "react-toastify";

function AddToCart({
  product,
  isOptional,
}: {
  product: Product;
  isOptional?: boolean;
}) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  function addToCartHandler() {
    const exsitingItem = cartItems.find((item) => item.slug === product.slug);

    const quantity = exsitingItem ? exsitingItem.quantity! + 1 : 1;

    if (product.count < quantity) return toast.error("Product Is Out.");

    dispatch({ type: ActionTypes.ADD_ITEM, payload: { ...product, quantity } });

    toast.success("Product Added.");

    if (isOptional) router.push("/cart");
  }

  return (
    <button
      className="btn bg-blue-400 text-white hover:bg-blue-500 hover:text-gray-100 block mx-auto mt-3 transition-all"
      onClick={addToCartHandler}
    >
      Add To Cart
    </button>
  );
}

export default AddToCart;
