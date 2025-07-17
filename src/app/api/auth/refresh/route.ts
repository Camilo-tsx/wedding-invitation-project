import { jwtConfig } from "@/config/config";
import { sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!accessToken && !refreshToken)
    return NextResponse.redirect(new URL("/login", req.url));
  if (!accessToken && refreshToken) {
    const validateToken = verify(refreshToken, jwtConfig.jwtSecret!);
    if (!validateToken)
      return NextResponse.redirect(new URL("/login", req.url));
    const newAccessToken = sign(
      { id: user.id, email: user.email, roles: user.roles },
      secret,
      { expiresIn: "30m" }
    );
    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 30,
    });
  }
};
