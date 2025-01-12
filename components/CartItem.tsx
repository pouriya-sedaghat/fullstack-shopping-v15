import { Product } from "@/interface/Product";

import Image from "next/image";

import { useContext } from "react";

import { CartContext } from "@/context/Cart";

import { ActionTypes } from "@/enums/ActionTypes";

import { toast } from "react-toastify";

function CartItem({ product }: { product: Product }) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(CartContext);

  function incrementQuantityHandler() {
    const cartProduct = cartItems.find((item) => item.slug === product.slug);

    if (cartProduct?.quantity! >= product.count)
      return toast.error("Product Is Out.");

    dispatch({
      type: ActionTypes.EDIT_QTY,
      payload: { ...product, quantity: cartProduct?.quantity! + 1 },
    });

    toast.success("Increment Product Quantity.");
  }

  function decrementQuantityHandler() {
    const cartProduct = cartItems.find((item) => item.slug === product.slug);

    if (cartProduct?.quantity! <= 1)
      return toast.error("Cant Decrement Product Quantity.");

    dispatch({
      type: ActionTypes.EDIT_QTY,
      payload: { ...product, quantity: cartProduct?.quantity! - 1 },
    });

    toast.success("Decrement Product Quantity.");
  }

  return (
    <div className="flex gap-x-3 bg-slate-100 overflow-hidden rounded-lg p-3">
      <div className="flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={80}
          height={60}
          priority
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-y-3 grow">
        <div className="space-y-1">
          <h2>{product.title}</h2>
          <p>{product.price.toLocaleString()} IRR</p>
        </div>
        <div className="flex flex-col justify-center gap-y-2 self-center ">
          <div className="flex items-center">
            <button
              className="btn py-0 bg-red-500"
              onClick={decrementQuantityHandler}
            >
              -
            </button>
            <span className="px-2">{product.quantity}</span>
            <button
              className="btn py-0 bg-green-500"
              onClick={incrementQuantityHandler}
            >
              +
            </button>
          </div>
          <button
            className="btn bg-sky-300"
            onClick={() => {
              dispatch({
                type: ActionTypes.REMOVE_ITEM,
                payload: product,
              });
              toast.success("Product Removed.");
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
