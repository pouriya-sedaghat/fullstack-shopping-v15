"use client";

import { Product } from "@/interface/Product";

import { ShippingData } from "@/interface/ShippingData";

import { PaymentMethod } from "@/types/PaymentMethod";

import { ActionTypes } from "@/enums/ActionTypes";

type State = {
  cart: {
    cartItems: Product[];
    shippingData: ShippingData;
    paymentMethod: PaymentMethod;
  };
};
type Action =
  | { type: ActionTypes.ADD_ITEM; payload: Product }
  | { type: ActionTypes.REMOVE_ITEM; payload: Product }
  | { type: ActionTypes.EDIT_QTY; payload: Product }
  | { type: ActionTypes.SHIPPING_DATA; payload: ShippingData }
  | { type: ActionTypes.PAYMENT_METHOD; payload: PaymentMethod };
type Dispatch = (action: Action) => void;
type CartContext = { state: State; dispatch: Dispatch };

import { createContext, useReducer } from "react";

import { Cookies } from "typescript-cookie";

export const CartContext = createContext({} as CartContext);

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart") as string)
    : {
        cartItems: [],
        shippingData: {},
      },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      {
        const newItem = action.payload;
        const existingItem = state.cart.cartItems.find(
          (item) => item.slug === newItem.slug
        );

        const cartItems = existingItem
          ? state.cart.cartItems.map((item) =>
              item.title === existingItem.title ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));

        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;
    case ActionTypes.REMOVE_ITEM:
      {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.slug !== action.payload.slug
        );

        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;
    case ActionTypes.EDIT_QTY:
      {
        const newItem = action.payload;

        const cartItems = state.cart.cartItems.map((item) =>
          item.slug === action.payload.slug ? newItem : item
        );

        Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      break;
    case ActionTypes.SHIPPING_DATA:
      {
        const shippingData = action.payload;

        Cookies.set("cart", JSON.stringify({ ...state.cart, shippingData }));

        return { ...state, cart: { ...state.cart, shippingData } };
      }
      break;
    case ActionTypes.PAYMENT_METHOD:
      {
        const paymentMethod = action.payload;

        Cookies.set("cart", JSON.stringify({ ...state.cart, paymentMethod }));

        return { ...state, cart: { ...state.cart, paymentMethod } };
      }
      break;
    default: {
      return state;
    }
  }
}

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
