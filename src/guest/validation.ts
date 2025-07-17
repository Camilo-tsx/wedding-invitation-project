import {
  boolean,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  optional,
  partial,
  pipe,
  string,
} from "valibot";

const familyName = pipe(
  string(),
  minLength(3, "Your family name must contain at least 3 characters"),
  maxLength(20, "Your family name can not have more than 20 characters")
);
const isAttending = boolean();
const menuOption = optional(string());
const attendingCount = pipe(number(), minValue(1), maxValue(10));

export const guestSchema = object({
  familyName,
  isAttending,
  menuOption,
  attendingCount,
});

const guestFieldsPartial = partial(guestSchema);

export const partialGuestSchema = object({
  id: string(),
  ...guestFieldsPartial.entries,
});
