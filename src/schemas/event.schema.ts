import {
  boolean,
  maxLength,
  minLength,
  object,
  partial,
  pipe,
  string,
} from "valibot";

const husbandName = pipe(
  string(),
  minLength(3, "El nombre de tu pareja debe contener al menos 3 caracteres"),
  maxLength(40, "El nombre de tu pareja no puede contener más de 40 caracteres")
);

const wifeName = pipe(
  string(),
  minLength(3, "El nombre de tu pareja debe contener al menos 3 caracteres"),
  maxLength(40, "El nombre de tu pareja no puede contener más de 40 caracteres")
);

const eventDate = pipe(string());

const location = pipe(
  string(),
  minLength(5, "La ubicación debe contener al menos 5 caracteres"),
  maxLength(200, "La ubicación no puede contener más de 200 caracteres")
);

const itinerary = pipe(
  string(),
  minLength(5, "El itinerario debe contener al menos 5 caracteres"),
  maxLength(200, "El itinerario no puede contener más de 200 caracteres")
);

const dressCode = pipe(
  string(),
  minLength(3, "El código de vestimenta debe contener al menos 3 caracteres"),
  maxLength(
    100,
    "El código de vestimenta no puede contener más de 100 caracteres"
  )
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
