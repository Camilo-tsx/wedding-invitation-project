"user server";
import { getUserById } from "@/user/service";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Record<string, string>;
}

export const GET = async (req: NextRequest, { params }: Params) => {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: "Something failed" });
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
