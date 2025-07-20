import { isTokenRevoked } from "@/auth/revokeTokens";
import { jwtConfig } from "@/config/config";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

interface customPayload extends JwtPayload {
  id: string;
  userName: string;
}

export const decodedToken = async (
  req: NextRequest
): Promise<customPayload | null> => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const decoded = verify(accessToken, jwtConfig.jwtSecret!) as customPayload;
    return decoded;
  } catch (_err) {
    return null;
  }
};

export const authenticateToken = async (req: NextRequest): Promise<boolean> => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken || !refreshToken) {
    return false;
  }

  if (await isTokenRevoked(refreshToken)) {
    return false;
  }

  try {
    const verifyAccessToken = verify(accessToken, jwtConfig.jwtSecret!);
    if (!verifyAccessToken) return false;

    const verifyRefreshToken = verify(refreshToken, jwtConfig.jwtSecret!);
    if (!verifyRefreshToken) return false;

    return true;
  } catch (_err) {
    return false;
  }
};
