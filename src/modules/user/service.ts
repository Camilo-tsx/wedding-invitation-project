import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { PartialUser, ROLES, SafeUser, User } from "./model";
import { dbQuery } from "@/utils/dbQuerys/dbQueries";
import { db } from "@/models/mysql/eventmanagerDb";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { jwtConfig } from "@/config/config";

export const registerAndLogin = async (
  email: string,
  password: string,
  userName: string
) => {
  const hashedPassword = await hash(password, 10);
  const id = randomUUID();

  try {
    await db.execute(
      "INSERT INTO users (id, email, `password`, username, roles, is_allowed) VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
      [id, email, hashedPassword, userName, ROLES.USER, false]
    );
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      if (err.message.includes("username")) {
        return NextResponse.json(
          { error: "El nombre de usuario ya está en uso", field: "userName" },
          { status: 409 }
        );
      }
      if (err.message.includes("email")) {
        return NextResponse.json(
          { error: "El email ya está en uso", field: "email" },
          { status: 409 }
        );
      }
    }
    throw err;
  }
  const accessToken = sign(
    { id, email, roles: ROLES.USER },
    jwtConfig.jwtAccessSecret!,
    {
      expiresIn: "30m",
    }
  );

  const refreshToken = sign({ userId: id }, jwtConfig.jwtRefreshSecret!, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({
    message: "Usuario creado e iniciado sesión",
  });

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

// Search if the email exists and then validates password, returns full user data
export const validateUser = async (
  email: string,
  password: string
): Promise<SafeUser | null> => {
  try {
    const [rows] = await db.execute(
      "SELECT BIN_TO_UUID(id) as id, username AS userName, email, `password`, roles, is_allowed AS isAllowed FROM users WHERE email = ?",
      [email]
    );
    const user = (rows as User[])[0];

    if (!user) return null;

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) return null;

    const { password: _, refreshToken, ...safeUser } = user;

    return safeUser;
  } catch (err) {
    console.error("Error validating password:", err);
    throw new Error("Cannot validate the password");
  }
};

// search the user by his email
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const [rows] = await db.execute(
      "SELECT BIN_TO_UUID(id) as id, username AS userName, email, `password`, roles, is_allowed AS isAllowed FROM users WHERE id = UUID_TO_BIN(?)",
      [id]
    );
    const user = (rows as User[])[0];

    if (!user) return null;

    return user;
  } catch (err) {
    console.error("Error finding user:", err);
    throw new Error("Error finding user");
  }
};

// update the user data and returns safeUser data that excludes password and refreshToken
export const updateUser = async (
  user: PartialUser,
  id: string
): Promise<SafeUser | null> => {
  const table = "users";
  const { query, values } = dbQuery(user, id, table);
  if (values.length <= 0) return null;
  await db.execute(query, values);

  const updatedUser = await getUserById(id);
  if (!updatedUser) return null;
  const { password, refreshToken, ...safeUser } = updatedUser;

  return safeUser;
};

// delete the user
export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await db.execute("DELETE FROM users WHERE id= UUID_TO_BIN(?)", [id]);
    return true;
  } catch (err) {
    console.error("The request can not be completed", err);
    return false;
  }
};
