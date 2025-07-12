export const EVENT_SELECT_FIELDS = `
  BIN_TO_UUID(id) AS id,
  BIN_TO_UUID(userId) AS userId,
  eventDate,
  location,
  itinerary,
  dressCode,
  husbandName,
  wifeName,
  kidsAllowed,
  specialMenu
`;

export const GUESTS_SELECT_FIELDS = `
  BIN_TO_UUID(id) AS id,
  familyName,
  BIN_TO_UUID(eventId) AS eventId,
  isAttending,
  menuOption,
  attendingCount
`;