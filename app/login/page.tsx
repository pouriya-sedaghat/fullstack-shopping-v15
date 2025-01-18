import SignInForm from "@/components/SignInForm";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
  };
}

function SignIn() {
  return (
    <div className="grid grid-cols-1 place-items-center h-full">
      <SignInForm />
    </div>
  );
}

export default SignIn;
