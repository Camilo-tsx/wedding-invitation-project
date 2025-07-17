import {
  check,
  email,
  maxLength,
  minLength,
  object,
  partial,
  pipe,
  string,
} from "valibot";

export const emailSchema = pipe(
  string(),
  email(),
  minLength(3, "Email must contain at least 3 characters"),
  maxLength(30, "Email can not contain more than 30 characters")
);
const userNameSchema = pipe(
  string(),
  minLength(3, "User name must contain at least 3 characters"),
  maxLength(30, "User name can not contain more than 30 characters"),
  check(
    (value) => /^[a-zA-Z0-9_.-]+$/.test(value),
    "User name can only contain letters, numbers, underscores, dots, and hyphens"
  )
);
const passwordSchema = pipe(
  string(),
  minLength(6, "Password must contain at least 6 characters"),
  maxLength(30, "Password can not contain more than 30 characters"),
  check(
    (value) => /[A-Z]/.test(value),
    "Debe contener al menos una letra mayúscula"
  ),
  check(
    (value) => /[^a-zA-Z0-9]/.test(value),
    "Debe contener al menos un símbolo"
  )
);

export const authSchema = object({
  email: emailSchema,
  userName: userNameSchema,
  password: passwordSchema,
});

export const validatePartialUser = partial(authSchema);
