"use server";

import { cookies } from "next/headers";

export const checkUiStatus = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return false;
  return true;
};
