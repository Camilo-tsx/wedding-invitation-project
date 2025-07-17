"user server";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { deleteUser } from "@/user/service";

export const DELETE = async (req: NextRequest) => {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return NextResponse.json({ message: "Token not found" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const id = payload.id;
    if (!id) return NextResponse.json({ message: "Payload content not found" });
    await deleteUser(id);
    return NextResponse.json({ message: "User delete correctly", status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Cannot delete you user correctly" },
      { status: 403 }
    );
  }
};
