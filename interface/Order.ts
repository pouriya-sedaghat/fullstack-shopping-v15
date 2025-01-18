import mongoose from "mongoose";

import { Product } from "@/interface/Product";

import { ShippingData } from "@/interface/ShippingData";

import { PaymentMethod } from "@/types/PaymentMethod";

export interface Order {
  _id?: string;
  user: mongoose.Types.ObjectId;
  orderItems: Product[];
  shippingData: ShippingData;
  paymentMethod: PaymentMethod;
}
