"use client";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized");
    },
  });

  if (status === "loading") return "Loading ...";

  return children;
}

export default Auth;
