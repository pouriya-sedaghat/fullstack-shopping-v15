import db from "./db";

import Product from "@/models/product.model";

import User from "@/models/user.model";

import Order from "@/models/order.model";

import { Product as PT } from "@/interface/Product";

import { User as UT } from "@/interface/User";

import { Order as OT } from "@/interface/Order";

async function getProductsHandler(): Promise<PT[]> {
  await db.connect();

  return (await Product.find().lean()).map(db.convertToObject as () => PT);
}

async function getUsersHandler(): Promise<UT[]> {
  await db.connect();

  return (await User.find().lean()).map(db.convertToObject as () => UT);
}

async function getOrdersHandler(): Promise<OT[]> {
  await db.connect();

  return (await Order.find().lean()).map(db.convertToObject as () => OT);
}

const service = { getProductsHandler, getUsersHandler, getOrdersHandler };

export default service;
