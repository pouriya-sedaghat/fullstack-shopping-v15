"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { ShippingData } from "@/interface/ShippingData";

import { useContext, useEffect } from "react";

import { CartContext } from "@/context/Cart";

import { ActionTypes } from "@/enums/ActionTypes";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

function ShippingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ShippingData>();

  const {
    state: {
      cart: {
        shippingData: { fullName, postalCode, address },
      },
    },
    dispatch,
  } = useContext(CartContext);

  const router = useRouter();

  const submitHandler: SubmitHandler<ShippingData> = ({
    fullName,
    postalCode,
    address,
  }) => {
    const shippingData = { fullName, postalCode, address };

    dispatch({ type: ActionTypes.SHIPPING_DATA, payload: shippingData });

    toast.success("Shipping Data Added.");

    router.push("/payment-method");
  };

  useEffect(() => {
    setValue("fullName", fullName);
    setValue("postalCode", postalCode);
    setValue("address", address);
  }, [setValue, fullName, postalCode, address]);

  return (
    <div className="bg-slate-300 justify-self-center self-center p-7 rounded-lg">
      <form onSubmit={handleSubmit(submitHandler)} className="w-min">
        <h2 className="mb-2">Shipping Data</h2>
        <div>
          <label htmlFor="full-name">Full Name:</label>
          <br />
          <input
            type="text"
            {...register("fullName", {
              required: "Full Name Is Required.",
              minLength: {
                value: 6,
                message: "Full Name Must Be Least At 6 Character Long.",
              },
            })}
            className="bg-transparent my-1 px-2 py-1 border border-slate-700 rounded-md"
            id="full-name"
            placeholder="Enter Your Full Name"
            autoFocus
          />
          {errors.fullName && (
            <small className="block text-red-700">
              {errors.fullName.message}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="postal-code">Postal Code:</label>
          <br />
          <input
            type="text"
            {...register("postalCode", {
              required: "Postal Code Is Required.",
              minLength: {
                value: 10,
                message: "Postal Code Must Be Least At 10 Character Long.",
              },
            })}
            className="bg-transparent my-1 px-2 py-1 border border-slate-700 rounded-md"
            id="postal-code"
            placeholder="Enter Your Postal Code"
            autoFocus
          />
          {errors.postalCode && (
            <small className="block text-red-700">
              {errors.postalCode.message}
            </small>
          )}
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <br />
          <textarea
            {...register("address", {
              required: "Address Is Required.",
            })}
            className="bg-transparent my-1 px-2 py-1 resize-none border border-slate-700 rounded-md"
            id="address"
            placeholder="Enter Your Address"
            autoFocus
          ></textarea>
          {errors.address && (
            <small className="block text-red-700">
              {errors.address.message}
            </small>
          )}
        </div>
        <div className="flex justify-center">
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

export default ShippingForm;
