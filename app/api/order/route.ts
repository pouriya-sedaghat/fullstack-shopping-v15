import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import db from "@/utils/db";

import Order from "@/models/order.model";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const { orderItems, shippingData, paymentMethod } = await request.json();

  const session = await getServerSession(authOptions);

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
