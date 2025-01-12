import Link from "next/link";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Access Denied",
  };
}

function AccessDenied() {
  return (
    <div className="grid grid-cols-1 items-center h-full bg-gray-900 text-white py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-6xl tracking-tight font-extrabold lg:text-7xl">
          Access Denied
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
          Something's missing.
        </p>
        <p className="mb-4 text-lg font-ligh">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>
        <Link
          href="/"
          className="btn bg-slate-600 hover:bg-slate-700 transition-all"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default AccessDenied;
