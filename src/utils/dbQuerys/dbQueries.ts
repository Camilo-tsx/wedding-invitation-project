interface DBQueryResult {
  query: string;
  values: any[];
}

const fieldMapping: Record<string, string> = {
  // Campos para tabla guests
  menuOption: "menu_option",
  eventId: "event_id",
  isAttending: "is_attending",
  attendingCount: "attending_count",
  familyName: "family_name",

  // Campos para tabla events
  userId: "user_id",
  eventDate: "event_date",
  location: "location",
  itinerary: "itinerary",
  dressCode: "dress_code",
  husbandName: "husband_name",
  wifeName: "wife_name",
  specialMenu: "special_menu",
  kidsAllowed: "kids_allowed",
  // Nota: 'id' no necesita mapeo ya que se mantiene igual
};

export const dbQuery = (
  param: Record<string, any>,
  id: string,
  table: string
): DBQueryResult => {
  const setUpdates: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(param)) {
    if (value !== undefined && key !== "id") {
      // Usar el mapeo o el nombre original si no existe mapeo
      const columnName = fieldMapping[key] || key;
      setUpdates.push(`${columnName} = ?`);
      values.push(value);
    }
  }

  if (setUpdates.length === 0) {
    return { query: "", values: [] };
  }

  const query = `UPDATE ${table} SET ${setUpdates.join(
    ", "
  )} WHERE id = UUID_TO_BIN(?)`;
  values.push(id);

  return { query, values };
};
