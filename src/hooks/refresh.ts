"use server";

import { isTokenRevoked } from "@/auth/revokeTokens";
import { jwtConfig } from "@/config/config";
import { getUserById } from "@/modules/user/service";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const refresh = async (refreshToken: string) => {
  try {
    const cookieStore = await cookies();
    const tokenRevoked = await isTokenRevoked(refreshToken);
    if (tokenRevoked) {
      throw new Error("Unauthorized: token revoked");
    }
    const { userId } = verify(refreshToken, jwtConfig.jwtRefreshSecret!) as {
      userId: string;
    };
    if (!userId) {
      throw new Error("Unauthorized: invalid refresh payload");
    }
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
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
    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 30,
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        isAllowed: user.isAllowed,
        roles: user.roles,
      },
    };
  } catch (err) {
    console.error("Error verifying refresh token", err);
    return null;
  }
};
