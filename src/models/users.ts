
import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { check, email, InferInput, maxLength, minLength, object, pipe, string } from "valibot";
import { db } from "./mysql/eventmanagerDb";


// validates data
const emailSchema = pipe(string(), email(), minLength(3, "Email must contain at least 3 characters"), maxLength(30, "Email can not contain more than 30 characters") )
const userNameSchema = pipe(string(),  minLength(3, "User name must contain at least 3 characters"), maxLength(30, "User name can not contain more than 30 characters"), check(
  (value) => /^[a-zA-Z0-9_.-]+$/.test(value),
  "User name can only contain letters, numbers, underscores, dots, and hyphens"
) )
const passwordSchema = pipe(string(),  minLength(6, "Password must contain at least 6 characters"), maxLength(30, "Password can not contain more than 30 characters"),check(
    (value) => /[A-Z]/.test(value),
    "Debe contener al menos una letra mayúscula"
  ),
  check(
    (value) => /[^a-zA-Z0-9]/.test(value),
    "Debe contener al menos un símbolo"
  )
); 

export enum ROLES {
    "ADMIN"= "admin",
    "USER" = "user"
}

const authSchema = object({
    email: emailSchema,
    userName: userNameSchema,
    password: passwordSchema
})

//user data type
export type User = InferInput<typeof authSchema> & {
    id: string,
    roles: ROLES
    isAllowed: boolean,
    refreshToken?: string;
}

export type safeUser = Omit<User, 'password' | 'refreshToken'>


// create new user, create a random UUID and returns isAllowed false by default 
export const createUser = async (
    email: string,
    password: string,
    userName: string,
): Promise<User> => {
    const hashedPassword = await hash(password, 10)
    const id = randomUUID()

    const newUser = {
        id,
        email, 
        password: hashedPassword,
        userName,
        roles: ROLES.USER,
        isAllowed: false
    }

    try {

        await db.execute(
        "INSERT INTO users (id, email, password, userName, roles, isAllowed) VALUES (UUID_TO_BIN(?),?,?,?,?,?)",
        [id, email, hashedPassword, userName, ROLES.USER, false]
    ) } catch (err) {
        console.error("Error al insertar en la base:", err);
        throw err;
    }

    return newUser
}


// Search if the email exists and then validates password, returns full user data
export const validateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const [rows] = await db.execute("SELECT BIN_TO_UUID(id) as id, userName, email, password, roles, isAllowed FROM users WHERE email = ?", [email]);
    const user = (rows as User[])[0];

    if (!user) return null;

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) return null;


    return user;
  } catch (err) {
    console.error("Error validating password:", err);
    throw new Error("Cannot validate the password");
  }
}

// search the user by his email 
export const getUserById = async (id:string): Promise<User | null> => {

    try {
        const [rows] = await db.execute("SELECT BIN_TO_UUID(id) as id, userName, email, password, refreshToken, roles, isAllowed FROM users WHERE id = UUID_TO_BIN(?)", [id])
        const user = (rows as User[])[0];

        if(!user) return null;


        return user;

    } catch (err) {
        console.error("Error finding user:", err)
        throw new Error("Error finding user")
    }


}

// update the user data and returns safeUser data that excludes password and refreshToken
export const updateUser = async (user: User): Promise<User | null> => {
    const hashedPassword = await hash(user.password, 10)
    await db.execute("UPDATE users SET email= ?, userName= ?, password= ? WHERE id= UUID_TO_BIN(?)", [user.email, user.userName, hashedPassword, user.id])

    const updatedUser = await getUserById(user.id)
    if (!updatedUser) return null;

    return updatedUser;


}

// delete the user 
export const deleteUser = async (id: string): Promise<boolean> => {
    try {
    await db.execute("DELETE FROM users WHERE id= UUID_TO_BIN(?)", [id])
    return true;
    } catch (err) {
        console.error("The request can not be completed", err)
        return false;
    }
}

