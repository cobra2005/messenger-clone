import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import 'dotenv/config';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if(!name || !email || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS as string) || 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error.message, 'Register Error');
    return new NextResponse('Internal Error', { status: 500 })
  }
}