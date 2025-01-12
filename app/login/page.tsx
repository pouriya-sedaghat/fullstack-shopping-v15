import SignInForm from "@/components/SignInForm";

import { Metadata } from "next";

// Using Zod In Client And Server Component

// import { z } from "zod";

// const userSchema = z.object({
//   email: z.string().email("Invalid Email Format."),
//   password: z.string().min(6, "Password Must Be At least 6 Character Long."),
// });

// type User = z.infer<typeof userSchema>;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
  };
}

function SignIn() {
  // async function submitHandler(formData: FormData) {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   const user: User = { email, password };

  //   const result = userSchema.safeParse(user);

  //   if (result.error) return console.log(result.error.message);

  //   console.log(result.data);
  // }

  return (
    <div className="grid grid-cols-1 place-items-center h-full">
      {/* <form action={submitHandler}>
        <h2>SingIn</h2>
        <div>
          <label htmlFor="email">Email :</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="password">Password :</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"a
            placeholder="Enter Your Password"
            autoFocus
          />
        </div>
        <button className="btn ">submit</button>
      </form> */}
      <SignInForm />
    </div>
  );
}

export default SignIn;
