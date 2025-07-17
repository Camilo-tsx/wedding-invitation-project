"user server";

import { createUser } from "@/user/service";
import { authSchema } from "@/user/validation";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

// create user
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = safeParse(authSchema, body);
  if (!result.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { email, password, userName } = body;
  try {
    const newUser = await createUser(email, password, userName);

    return NextResponse.json(newUser, {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message });
    } else {
      return NextResponse.json({ message: "Internal Server Error" });
    }
  }
};
