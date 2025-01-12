import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Schema.Types.ObjectId | string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
