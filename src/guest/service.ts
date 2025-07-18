import { GUESTS_SELECT_FIELDS } from "@/utils/dbQuerys/events.model";
import { Guest, PartialGuest } from "./model";
import { db } from "./mysql/eventmanagerDb";
import { dbQuery } from "@/utils/dbQuerys/dbQueries";

export const addGuest = async (guest: Guest): Promise<Guest | null> => {
  const id = crypto.randomUUID;
  try {
    const [rows] = await db.execute(
      "INSERT INTO guests (id, familyName, eventId, isAttending, menuOption, attendingCount) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?),?,?,?,?)",
      [
        id,
        guest.familyName,
        guest.eventId,
        guest.isAttending,
        guest.menuOption,
        guest.attendingCount,
      ]
    );

    const newGuest = (rows as Guest[])[0];
    if (!newGuest) return null;
    return newGuest;
  } catch (err) {
    console.error("Error to create new guest", err);
    return null;
  }
};

export const deleteGuest = async (id: string): Promise<boolean> => {
  try {
    await db.execute("DELETE FROM guests WHERE id = UUID_TO_BIN(?)", [id]);
    return true;
  } catch (err) {
    console.error("Can not delete a guest", err);
    return false;
  }
};

export const getGuestById = async (
  id: string,
  eventId: string
): Promise<Guest | null> => {
  try {
    const [rows] = await db.execute(
      `SELECT ${GUESTS_SELECT_FIELDS} FROM guests WHERE id = UUID_TO_BIN(?) and eventId = UUID_TO_BIN(?)`,
      [id, eventId]
    );

    const guest = (rows as Guest[])[0];
    if (!guest) return null;
    return guest;
  } catch (err) {
    console.error("Cannot get the guest", err);
    return null;
  }
};

export const updateGuest = async (
  guest: PartialGuest,
  eventId: string
): Promise<Guest | null> => {
  const table = "guests";
  const { query, values } = dbQuery(guest, guest.id, table);
  if (values.length === 0) return null;

  try {
    await db.execute(query, values);
  } catch (err) {
    console.error("Guest can not be updated");
    return null;
  }

  const updatedGuest = await getGuestById(guest.id, eventId);
  if (!updatedGuest) return null;
  return updatedGuest;
};

export const getAllGuest = async (eventId: string): Promise<Guest[] | null> => {
  try {
    const [rows] = await db.execute(
      `SELECT ${GUESTS_SELECT_FIELDS} FROM guests WHERE eventId = ?`,
      [eventId]
    );
    const allGuest = rows;
    return allGuest as Guest[];
  } catch (err) {
    console.error("Error: Can not get all guest", err);
    return null;
  }
};
