"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";

import { User } from "@/interface/User";

import { signIn, useSession } from "next-auth/react";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { data: session } = useSession();

  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const submitHandler: SubmitHandler<User> = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) console.log("SigIn Is Faild.");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session?.user) router.push(redirect || "/");
  }, [session, router, redirect]);

  return (
    <form
      className="bg-slate-200 p-7 rounded-lg"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="mb-2">SingIn</h2>
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
        <Link href="/register" className="text-lime-600">
          Register
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

export default SignInForm;
