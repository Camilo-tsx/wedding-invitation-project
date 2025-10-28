"use server";

import { registerAndLogin } from "@/modules/user/service";
import { authSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

// create user
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = safeParse(authSchema, body);
  if (!result.success)
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });

  const { email, password, userName } = result.output;

  try {
    const response = await registerAndLogin(email, password, userName);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error al registrar usuario" },
      { status: 500 }
    );
  }
};
