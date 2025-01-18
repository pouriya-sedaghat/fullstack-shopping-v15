import db from "@/utils/db";

import Order from "@/models/order.model";

// NextAuth Version 4

// import { getServerSession } from "next-auth";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// NextAuth Version 5 (Beta 25)

import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { Order as T } from "@/interface/Order";

import Auth from "@/components/Auth";

import { Fragment } from "react";

async function OrderHistory() {
  // NextAuth Version 5 (Beta 25)

  // const session = await getServerSession(authOptions);

  // NextAuth Version 5 (Beta 25)

  const session = await auth();

  if (!session?.user) redirect("/access-denied");

  await db.connect();

  const orders: T[] = await Order.find({ user: session.user._id }).lean();

  return (
    <Auth>
      <div className="gird grid-cols-1">
        <h2 className="text-gray-800">Order History</h2>
        <table className="my-2 w-full text-center text-sm text-white rounded-md overflow-hidden">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th className="px-8 py-3">Item</th>
              <th className="px-8 py-3">Quantity</th>
              <th className="px-8 py-3">Price</th>
              <th className="px-8 py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <Fragment key={item._id}>
                {item.orderItems.map((oItem) => (
                  <tr
                    key={oItem._id?.toString()}
                    className={`border-b border-gray-700 ${
                      index % 2 === 0
                        ? "bg-zinc-800 hover:bg-zinc-600"
                        : "bg-gray-800 hover:bg-gray-600"
                    } transition-all`}
                  >
                    <td className="px-6 py-4">{oItem.title}</td>
                    <td>{oItem.quantity}</td>
                    <td>{oItem.price.toLocaleString()} IRR</td>
                    <td>
                      {(oItem.quantity! * oItem.price).toLocaleString()} IRR
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Auth>
  );
}

export default OrderHistory;
