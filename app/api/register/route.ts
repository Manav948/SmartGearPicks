import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const registrationSecret = process.env.REGISTRATION_SECRET;
    
    if (!registrationSecret) {
      return NextResponse.json(
        { error: "Registration is disabled. REGISTRATION_SECRET is not configured on the server." },
        { status: 403 }
      );
    }

    const requestSecret = req.headers.get("X-Registration-Secret");
    if (requestSecret !== registrationSecret) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid registration secret." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin with this email already exists" },
        { status: 400 }
      );
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Admin registered successfully",
        admin: {
          id: admin.id,
          email: admin.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}
