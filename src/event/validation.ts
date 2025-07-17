import {
  boolean,
  date,
  maxLength,
  minLength,
  object,
  partial,
  pipe,
  string,
} from "valibot";

const husbandName = pipe(
  string(),
  minLength(3, "Your partner name must contain at least 3 characters"),
  maxLength(
    40,
    "Your partner name can not contain more than 40 characters please"
  )
);
const wifeName = pipe(
  string(),
  minLength(3, "Your partner name must contain at least 3 characters"),
  maxLength(
    40,
    "Your partner name can not contain more than 40 characters please"
  )
);
const eventDate = pipe(date());
const location = pipe(
  string(),
  minLength(5, "Your location must contain at least 5 characters"),
  maxLength(200, "Your location can not contain more than 200 characters")
);
const itinerary = pipe(
  string(),
  minLength(5, "Your itinerary must contain at least 5 characters"),
  maxLength(200, "Your itinerary can not contain more than 200 characters")
);
const dressCode = pipe(
  string(),
  minLength(3, "Your dress code must contain at least 3 characters"),
  maxLength(100, "Your dress code can not contain more than 100 characters")
);
const specialMenu = boolean();
const kidsAllowed = boolean();

export const eventSchema = object({
  husbandName,
  wifeName,
  eventDate,
  location,
  itinerary,
  dressCode,
  kidsAllowed,
  specialMenu,
});

export const validatePartialEvent = partial(eventSchema);
