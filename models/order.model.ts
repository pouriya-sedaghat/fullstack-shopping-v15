import mongoose, { Document } from "mongoose";

import { Order as T } from "@/interface/Order";

interface OrderSchema extends Omit<T, "_id">, Document {}

const orderSchema = new mongoose.Schema<OrderSchema>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  shippingData: {
    fullName: { type: String, required: true },
    postalCode: { type: String, required: true },
    address: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
});

const Order =
  mongoose.models.Order || mongoose.model<OrderSchema>("Order", orderSchema);

export default Order;
