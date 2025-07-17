import { db } from "./mysql/eventmanagerDb";

// add refreshToken to the db and add the reason why were revoked too
export const addRevokeToken = async (
  token: string,
  userId: string
): Promise<void> => {
  await db.execute(
    "INSERT INTO revokedTokens (id, token, userId) VALUES (UUID_TO_BIN(?),?,?)",
    [crypto.randomUUID(), token, userId]
  );
};

interface RevokedTokenRow {
  token: string;
}

//verify if token is revoked or not
export const isTokenRevoked = async (token: string): Promise<boolean> => {
  const [rows] = await db.execute(
    "SELECT token FROM revokedTokens WHERE token = ? AND userId = UUID_TO_BIN(?)",
    [token]
  );
  const result = (rows as RevokedTokenRow[])[0];
  if (!result) return false;

  return true;
};
