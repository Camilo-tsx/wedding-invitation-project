import { db } from "@/core/database/connection";

// add refreshToken to the db and add the reason why were revoked too
export const addRevokeToken = async (
  token: string,
  userId: string
): Promise<void> => {
  await db.execute(
    "INSERT INTO revoked_tokens (id, token, user_id) VALUES (UUID_TO_BIN(?),?,UUID_TO_BIN(?))",
    [crypto.randomUUID(), token, userId]
  );
};

interface RevokedTokenRow {
  token: string;
}

//verify if token is revoked or not
export const isTokenRevoked = async (token: string): Promise<boolean> => {
  const [rows] = await db.execute(
    "SELECT token FROM revoked_tokens WHERE token = ?",
    [token]
  );
  const result = (rows as RevokedTokenRow[])[0];
  if (!result) return false;

  return true;
};
