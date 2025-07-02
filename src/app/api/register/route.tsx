import { createUser } from "@/models/users"
import { NextResponse } from "next/server"

export const POST = async () => {
    

    const newUser = await createUser()

    return NextResponse.json(newUser)
}