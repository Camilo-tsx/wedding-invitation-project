import { isTokenRevoked } from "@/core/services/auth/revokeTokens";
import { jwtConfig } from "@/config/config";
import { getUserById } from "@/core/services/user/service";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 }
      );
    }

    const tokenRevoked = await isTokenRevoked(refreshToken);
    if (tokenRevoked) {
      return NextResponse.json({ error: "Token revoked" }, { status: 401 });
    }

    const { userId } = verify(refreshToken, jwtConfig.jwtRefreshSecret!) as {
      userId: string;
    };

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newAccessToken = sign(
      {
        id: user.id,
        email: user.email,
        roles: user.roles,
        isAllowed: user.isAllowed,
        userName: user.userName,
      },
      jwtConfig.jwtAccessSecret!,
      { expiresIn: "30m" }
    );

    // Crear la respuesta con el usuario
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        isAllowed: user.isAllowed,
        roles: user.roles,
      },
    });

    // Setear la cookie en la respuesta
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 30,
    });

    return response;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 }
    );
  }
}
