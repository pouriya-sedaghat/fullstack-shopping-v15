import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { redirect } from "next/navigation";

import Auth from "@/components/Auth";

import AdimnMenu from "@/components/AdimnMenu";

import db from "@/utils/db";

import User from "@/models/user.model";
import Product from "@/models/product.model";
import Order from "@/models/order.model";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Admin - Dashboard",
  };
}

async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user.isAdmin) redirect("/access-denied");

  await db.connect();

  const usersCount = await User.countDocuments();
  const productsCount = await Product.countDocuments();
  const ordersCount = await Order.countDocuments();

  return (
    <Auth>
      <div className="grid grid-rows-[auto,1fr] h-full">
        <AdimnMenu />
        <div className="justify-self-center self-center">
          <div className="flex justify-center gap-x-4 bg-slate-500 text-white p-5 rounded-md">
            <div className="flex flex-col items-center gap-y-2">
              <span>Users</span>
              <span className="px-2 bg-white text-slate-700 rounded-full">
                {usersCount}
              </span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <span>Products</span>
              <span className="px-2 bg-white text-slate-700 rounded-full">
                {productsCount}
              </span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <span>Orders</span>
              <span className="px-2 bg-white text-slate-700 rounded-full">
                {ordersCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default Dashboard;
