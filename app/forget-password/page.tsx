import ForgetPasswordForm from "@/components/ForgetPasswordForm";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Forget Password",
  };
}

function ForgetPassword() {
  return (
    <div className="grid grid-cols-1 place-items-center h-full">
      <ForgetPasswordForm />
    </div>
  );
}

export default ForgetPassword;
