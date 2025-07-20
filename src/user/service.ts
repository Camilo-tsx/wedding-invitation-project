import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { PartialUser, ROLES, SafeUser, User } from "./model";
import { dbQuery } from "@/utils/dbQuerys/dbQueries";
import { db } from "@/models/mysql/eventmanagerDb";

export const createUser = async (
  email: string,
  password: string,
  userName: string
): Promise<User> => {
  const hashedPassword = await hash(password, 10);
  const id = randomUUID();

  const newUser = {
    id,
    email,
    password: hashedPassword,
    userName,
    roles: ROLES.USER,
    isAllowed: false,
  };

  try {
    await db.execute(
      "INSERT INTO users (id, email, `password`, username, roles, is_allowed) VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
      [id, email, hashedPassword, userName, ROLES.USER, false]
    );
  } catch (err) {
    console.error("Error al insertar en la base:", err);
    throw err;
  }

  return newUser;
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
