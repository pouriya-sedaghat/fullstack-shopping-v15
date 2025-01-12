"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";

import { User } from "@/interface/User";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const submitHandler: SubmitHandler<User> = async ({
    username,
    email,
    password,
  }) => {
    const reqBody = { username, email, password };

    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <form
      className="bg-slate-200 p-7 rounded-lg"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="mb-2">Register</h2>
      <div>
        <label htmlFor="username">Username :</label>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Enter Your Username"
          className="bg-transparent my-1 px-2 py-1 border border-slate-700 rounded-md"
          {...register("username", {
            required: "Username Is Required.",
            minLength: {
              value: 5,
              message: "Username Must Be At Least 5 Character Long.",
            },
          })}
          autoFocus
        />
      </div>
      {errors.username && (
        <small className="block text-red-700">{errors.username.message}</small>
      )}
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
      <div>
        <label htmlFor="password">Password :</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="Enter Your Password"
          className="bg-transparent my-1 px-2 py-1 border border-slate-700 rounded-md"
          {...register("password", {
            required: "Password Is Required.",
            minLength: {
              value: 6,
              message: "Password Must Be At Least 6 Character Long.",
            },
          })}
          autoFocus
        />
        {errors.password && (
          <small className="block text-red-700">
            {errors.password.message}
          </small>
        )}
      </div>
      <div className="flex flex-col my-3">
        <Link href="/login" className="text-lime-600">
          LogIn
        </Link>
        <Link href="/forget-password" className="text-rose-600">
          Forget Password
        </Link>
      </div>
      <button type="submit" className="btn block mx-auto bg-sky-300 mt-3">
        submit
      </button>
    </form>
  );
}

export default RegisterForm;
