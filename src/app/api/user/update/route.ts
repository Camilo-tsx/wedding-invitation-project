"user server"
import { decodedToken } from "@/lib/authenticateToken"
import { updateUser, validatePartialUser } from "@/models/users"
import { NextRequest, NextResponse } from "next/server"
import { safeParse } from "valibot"


// update user
export const POST = async (req: NextRequest) => {
    const payload = await decodedToken(req)
    if (!payload) return NextResponse.json({message: "Can not get the payload"}, {status: 400})
    const id = payload.id
    const body = await req.json()
    const result = safeParse(validatePartialUser, body)
    if (!result.success) {
        return NextResponse.json({message: "Bad Request"}, {status: 400})
    }

    try {
        const user = result.output
        const updatedUser = await updateUser(user, id)
        return NextResponse.json(updatedUser, {status: 201, headers: {"Content-Type": "application/json"}})

    } catch (err) {
        console.error("Error en updateUser:", err)
    if (err instanceof Error) {
        return NextResponse.json({message: err.message}, {status: 500})
    } else {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}
}