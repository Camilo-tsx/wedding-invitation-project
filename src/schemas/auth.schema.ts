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
  minLength(3, "El correo no puede tener menos de 3 caracteres"),
  maxLength(30, "El correo no puede tener más de 30 caracteres")
);

const userNameSchema = pipe(
  string(),
  minLength(3, "El nombre de usuario no puede tener menos de 3 caracteres"),
  maxLength(30, "El nombre de usuario no puede tener más de 30 caracteres"),
  check(
    (value) => /^[a-zA-Z0-9_.-]+$/.test(value),
    "El nombre de usuario no puede contener espacios ni caracteres especiales"
  )
);

const passwordSchema = pipe(
  string(),
  minLength(6, "La contraseña no puede tener menos de 6 caracteres"),
  maxLength(30, "La contraseña no puede tener más de 30 caracteres"),
  check(
    (value) => /[A-Z]/.test(value),
    "La contraseña debe contener al menos una letra mayúscula"
  ),
  check(
    (value) => /[^a-zA-Z0-9]/.test(value),
    "La contraseña debe contener al menos un símbolo"
  )
);

export const authSchema = object({
  email: emailSchema,
  userName: userNameSchema,
  password: passwordSchema,
});

export const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

export const validatePartialUser = partial(authSchema);
