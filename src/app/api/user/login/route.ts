"user server";
import { validateUser } from "@/user/service";
import { authSchema } from "@/user/validation";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = safeParse(authSchema, body);
  if (!result.success)
    return NextResponse.json({ message: "Bad Request", status: 400 });

  const { email, password } = result.output;

  const user = await validateUser(email, password);
  if (!user)
    return NextResponse.json({
      message: "Invalid email or password",
      status: 401,
    });

  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined in environment variables");

  const accessToken = sign(
    { id: user.id, email: user.email, roles: user.roles },
    secret,
    { expiresIn: "30m" }
  );

  const refreshToken = sign({ userId: user.id }, secret, { expiresIn: "7d" });

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
