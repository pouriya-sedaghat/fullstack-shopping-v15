import mongoose from "mongoose";

import { Product } from "@/interface/Product";

import { User } from "@/interface/User";

import { Order } from "@/interface/Order";

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopping");

    console.log("Connected.");
  } catch (err) {
    console.log(err);

    throw new Error("Faild To Connection.");
  }
}

function convertToObject(doc: Product | User | Order): Product | User | Order {
  doc._id = doc._id?.toString();

  return doc;
}

const db = { connect, convertToObject };

export default db;
