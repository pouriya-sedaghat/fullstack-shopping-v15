import { NextRequest, NextResponse } from "next/server";

// NextAuth Version 4

// import { getServerSession } from "next-auth";

// import { authOptions } from "../auth/[...nextauth]/route";

// NextAuth Version 5 (Beta 25)

import { auth } from "@/auth";

import db from "@/utils/db";

import Order from "@/models/order.model";

export async function POST(request: NextRequest) {
  const { orderItems, shippingData, paymentMethod } = await request.json();

  // NextAuth Version 4

  // const session = await getServerSession(authOptions);

  // NextAuth Version 5 (Beta 25)

  const session = await auth();

  if (!session?.user) throw new Error("SignIn Required.");

  const order = {
    user: session.user._id,
    orderItems,
    shippingData,
    paymentMethod,
  };

  await db.connect();

  const newOrder = new Order(order);

  const result = await newOrder.save();

  return NextResponse.json(result);
}
