import { jwtConfig } from "@/config/config";

import { JwtPayload, verify } from "jsonwebtoken";
import { ROLES } from "../user/model";

export interface UserFromPayload extends JwtPayload {
  id: string;
  userName: string;
  isAllowed: boolean;
  email: string;
  roles: ROLES;
}

export const verifyAccessToken = (token: string): UserFromPayload | null => {
  if (!token) {
    return null;
  }

  if (!jwtConfig.jwtAccessSecret) {
    throw new Error("JWT secret is missing in config");
  }

  try {
    const user = verify(token, jwtConfig.jwtAccessSecret) as UserFromPayload;
    return user;
  } catch (_err) {
    return null;
  }
};
