import { NextRequest, NextResponse } from "next/server";

import users from "@/data/users";

import db from "@/utils/db";

import User from "@/models/user.model";

import bcrypt from "bcryptjs";

import { User as T } from "@/interface/User";

export async function GET() {
  await db.connect();

  const newUsers: T[] = await User.insertMany(users);

  return Response.json(newUsers);
}

export async function POST(request: NextRequest) {
  const { username, email, password }: T = await request.json();

  await db.connect();

  const newUser = new User({
    username,
    email,
    password: bcrypt.hashSync(password),
  });

  const user = await newUser.save();

  return NextResponse.json(user);
}
