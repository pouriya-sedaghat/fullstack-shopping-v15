import mongoose from "mongoose";

export interface Product {
  _id?: mongoose.Schema.Types.ObjectId | string;
  slug: string;
  title: string;
  price: number;
  description: string;
  category: string;
  count: number;
  image: string;
  quantity?: number;
  subtotal?: number;
}
