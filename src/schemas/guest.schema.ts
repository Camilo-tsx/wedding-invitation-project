import {
  boolean,
  maxLength,
  minLength,
  object,
  optional,
  partial,
  pipe,
  string,
} from "valibot";

const familyName = pipe(
  string(),
  minLength(3, "El nombre de la familia debe contener al menos 3 caracteres"),
  maxLength(20, "El nombre de la familia no debe contener mas de 20 caracteres")
);
const isAttending = boolean();
const menuOption = optional(string());
const attendingCount = pipe(string());

export const guestSchema = object({
  familyName,
  isAttending,
  menuOption,
  attendingCount,
});

export const guestFieldsPartial = partial(guestSchema);

export const partialGuestSchema = object({
  id: string(),
  ...guestFieldsPartial.entries,
});
