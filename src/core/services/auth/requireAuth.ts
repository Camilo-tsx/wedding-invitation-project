import { cookies } from "next/headers";
import { verify, sign } from "jsonwebtoken";
import { jwtConfig } from "@/config/config";
import { getUserById } from "@/core/services/user/service";
import { isTokenRevoked } from "@/core/services/auth/revokeTokens";
import { UserFromPayload } from "./authenticateToken";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Si no hay tokens → no autorizado
  if (!accessToken && !refreshToken) {
    return { user: null, newAccessToken: null };
  }

  try {
    // Intentar validar accessToken
    const payload = verify(
      accessToken!,
      jwtConfig.jwtAccessSecret!
    ) as UserFromPayload;
    return { user: payload, newAccessToken: null };
  } catch (err) {
    // Access token inválido o expirado → intentar refresh
    if (!refreshToken) return { user: null, newAccessToken: null };

    try {
      const tokenRevoked = await isTokenRevoked(refreshToken);
      if (tokenRevoked) {
        return { user: null, newAccessToken: null };
      }
      const { userId } = verify(refreshToken, jwtConfig.jwtRefreshSecret!) as {
        userId: string;
      };

      const user = await getUserById(userId);
      if (!user) return { user: null, newAccessToken: null };

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

      return { user, newAccessToken };
    } catch (e) {
      return { user: null, newAccessToken: null };
    }
  }
}
