import { InferInput } from "valibot";
import { authSchema, validatePartialUser } from "../../schemas/auth.schema";

export enum ROLES {
  ADMIN = "admin",
  USER = "user",
}

export type User = InferInput<typeof authSchema> & {
  id: string;
  roles: ROLES;
  isAllowed: boolean;
  refreshToken?: string;
};

export type PartialUser = InferInput<typeof validatePartialUser>;

export type SafeUser = Omit<User, "password" | "refreshToken">;
