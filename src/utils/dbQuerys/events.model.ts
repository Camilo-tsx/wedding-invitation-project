export const EVENT_SELECT_FIELDS = `
  BIN_TO_UUID(id) AS id,
  BIN_TO_UUID(user_id) AS userId,
  event_date AS eventDate,
  location,
  itinerary,
  dress_code AS dressCode,
  husband_name AS husbandName,
  wife_name AS wifeName,
  kids_allowed AS kidsAllowed,
  special_menu AS specialMenu
`;

export const GUESTS_SELECT_FIELDS = `
  BIN_TO_UUID(id) AS id,
  family_name AS familyName,
  BIN_TO_UUID(event_id) AS eventId,
  is_attending AS isAttending,
  menu_option AS menuOption,
  attending_count as attendingCount
`;
