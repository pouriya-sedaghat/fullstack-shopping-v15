import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

import Auth from "@/components/Auth";

import AdimnMenu from "@/components/AdimnMenu";

import service from "@/utils/service";

import { Order } from "@/interface/Order";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Admin - Orders",
  };
}

async function Orders() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user.isAdmin) redirect("/access-denied");

  const orders: Order[] = await service.getOrdersHandler();

  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] gap-y-3 h-full">
        <AdimnMenu />
        <div>
          <h2 className="text-gray-800">Orders</h2>
          <table className="my-2 w-full text-center text-sm text-white rounded-md overflow-hidden">
            <thead className="text-xs text-white uppercase bg-gray-700">
              <tr>
                <th className="px-8 py-3">FullName</th>
                <th className="px-8 py-3">Postal Code</th>
                <th className="px-8 py-3">Address</th>
                <th className="px-8 py-3">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr
                  key={item._id as string}
                  className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600 transition-all"
                >
                  <td className="px-6 py-4">{item.shippingData.fullName}</td>
                  <td className="px-6 py-4">{item.shippingData.postalCode}</td>
                  <td className="px-6 py-4">{item.shippingData.address}</td>
                  <td className="px-6 py-4">{item.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Auth>
  );
}

export default Orders;
