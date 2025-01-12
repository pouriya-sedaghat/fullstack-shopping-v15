import mongoose from "mongoose";

import { Product } from "@/interface/Product";

import { ShippingData } from "@/interface/ShippingData";

import { PaymentMethod } from "@/types/PaymentMethod";

export interface Order {
  _id?: mongoose.Schema.Types.ObjectId | string;
  user: mongoose.Types.ObjectId | string;
  orderItems: Product[];
  shippingData: ShippingData;
  paymentMethod: PaymentMethod;
}
