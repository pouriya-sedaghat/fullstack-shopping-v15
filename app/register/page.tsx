import RegisterForm from "@/components/RegisterForm";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Register",
  };
}

function SignIn() {
  return (
    <div className="grid grid-cols-1 place-items-center h-full">
      <RegisterForm />
    </div>
  );
}

export default SignIn;
