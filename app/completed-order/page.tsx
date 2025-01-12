import Link from "next/link";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Completed Order",
  };
}

function CompletedOrder() {
  return (
    <div className="grid grid-cols-1 items-center h-full bg-gray-900 text-white py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">
          Copmleted Order
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
          Successful Operation.
        </p>
        <p className="mb-4 text-lg font-ligh">
          Thank You, You Can View Your Orders On The Order History Page.
        </p>
        <Link
          href="/user/order-history"
          className="btn bg-slate-600 hover:bg-slate-700 transition-all"
        >
          Order History
        </Link>
      </div>
    </div>
  );
}

export default CompletedOrder;
