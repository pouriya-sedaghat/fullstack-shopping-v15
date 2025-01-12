import mongoose, { Document } from "mongoose";

import { Product as T } from "@/interface/Product";

interface ProductSchema extends Omit<T, "_id">, Document {}

const productSchema = new mongoose.Schema<ProductSchema>({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  count: { type: Number, required: true },
  image: { type: String, required: true },
});

const Product =
  mongoose.models.Product ||
  mongoose.model<ProductSchema>("Product", productSchema);

export default Product;
