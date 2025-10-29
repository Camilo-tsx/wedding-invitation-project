"use server";
import { jwtConfig } from "@/config/config";
import { validateUser } from "@/modules/user/service";
import { loginSchema } from "@/schemas/auth.schema";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = safeParse(loginSchema, body);
  if (!result.success)
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });

  const { email, password } = result.output;

  const user = await validateUser(email, password);
  if (!user)
    return NextResponse.json(
      {
        error: "Usuario o contraseña invalidos",
        field: "password",
      },
      { status: 401 }
    );

  if (!jwtConfig.jwtAccessSecret)
    throw new Error("JWT_SECRET is not defined in environment variables");

  const accessToken = sign(
    {
      id: user.id,
      email: user.email,
      roles: user.roles,
      userName: user.userName,
      isAllowed: user.isAllowed,
    },
    jwtConfig.jwtAccessSecret,
    { expiresIn: "30m" }
  );

  if (!jwtConfig.jwtRefreshSecret)
    throw new Error("JWT_SECRET is not defined in environment variables");

  const refreshToken = sign({ userId: user.id }, jwtConfig.jwtRefreshSecret, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 30,
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
};
