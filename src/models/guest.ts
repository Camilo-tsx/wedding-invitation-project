import { maxLength, minLength, pipe, string } from "valibot";

const name = pipe(string(), minLength(3, "Your name must contain at least 3 characters"), maxLength(20, "Your name can not have more than 20 characters") )
const surname = pipe(string(), minLength(3, "Your surname must contain at least 3 characters"), maxLength(20, "Your surname can not have more than 20 characters") )

