import { jwtConfig } from "@/config/config";
import { getUserById } from "@/user/service";
import { sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!accessToken && refreshToken) {
    try {
      const { id } = verify(refreshToken, jwtConfig.jwtSecret!) as {
        id: string;
      };
      if (!id) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const user = await getUserById(id);
      if (!user) {
        return NextResponse.json(
          { message: "Cannot find the user" },
          { status: 404 }
        );
      }

      const newAccessToken = sign(
        { id: user.id, email: user.email, roles: user.roles },
        jwtConfig.jwtSecret!,
        { expiresIn: "30m" }
      );

      const response = NextResponse.json({ message: "Access token refreshed" });

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 30,
      });

      return response;
    } catch (err) {
      console.error("Error verifying refresh token", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.json({ message: "Access token still valid" });
};
