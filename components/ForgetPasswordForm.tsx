"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";

import { User } from "@/interface/User";

function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const submitHandler: SubmitHandler<User> = async ({ email }) => {
    console.log(email);
  };

  return (
    <form
      className="bg-slate-200 p-7 rounded-lg"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="mb-2">Forget Password</h2>
      <div>
        <label htmlFor="email">Email :</label>
        <br />
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email"
          className="bg-transparent my-1 px-2 py-1 border border-slate-700 rounded-md"
          {...register("email", { required: "Eamil Is Required." })}
          autoFocus
        />
      </div>
      {errors.email && (
        <small className="block text-red-700">{errors.email.message}</small>
      )}
      <div className="flex flex-col my-3">
        <Link href="/register" className="text-green-600">
          Register
        </Link>
        <Link href="/login" className="text-rose-400">
          LogIn
        </Link>
      </div>
      <button type="submit" className="btn block mx-auto bg-sky-300 mt-3">
        submit
      </button>
    </form>
  );
}

export default ForgetPasswordForm;
