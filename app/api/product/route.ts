import { NextResponse } from "next/server";

import db from "@/utils/db";

import Product from "@/models/product.model";

import products from "@/data/products.json";

export async function GET() {
  await db.connect();

  const result = await Product.insertMany(products);

  return NextResponse.json(result);
}
