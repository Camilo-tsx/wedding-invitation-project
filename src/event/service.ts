import { dbQuery } from "@/utils/dbQuerys/dbQueries";
import { EVENT_SELECT_FIELDS } from "@/utils/dbQuerys/events.model";
import { Event, PartialEvent } from "./model";
import { db } from "./mysql/eventmanagerDb";

export const createEvent = async (
  userId: string,
  inputValues: Omit<Event, "id">
): Promise<Event | null> => {
  const id = crypto.randomUUID();
  try {
    await db.execute(
      "INSERT INTO events (id, userId, eventDate, location, itinerary, dressCode, husbandName, wifeName, kidsAllowed, specialMenu) VALUES(UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,?,?,?,?,?)",
      [
        id,
        userId,
        inputValues.eventDate,
        inputValues.location,
        inputValues.itinerary,
        inputValues.dressCode,
        inputValues.husbandName,
        inputValues.wifeName,
        inputValues.kidsAllowed,
        inputValues.specialMenu,
      ]
    );
    const newEvent = {
      ...inputValues,
      id,
      userId,
    };

    return newEvent;
  } catch (err) {
    console.error("An error creating the event has ocurred:", err);
    return null;
  }
};

export const getEventById = async (
  id: string,
  userId: string
): Promise<Event | null> => {
  try {
    const [rows] = await db.execute(
      `SELECT ${EVENT_SELECT_FIELDS} FROM events WHERE id = UUID_TO_BIN(?) and userId = UUID_TO_BIN(?)`,
      [id, userId]
    );
    const event = (rows as Event[])[0];
    if (!event) return null;

    return event;
  } catch (err) {
    console.error("Error getting email:", err);
    return null;
  }
};

export const deleteEvent = async (id: string): Promise<boolean> => {
  try {
    await db.execute("DELETE FROM events WHERE id = UUID_TO_BIN(?)", [id]);
    return true;
  } catch (err) {
    console.error("Event can not be deleted:", err);
    return false;
  }
};

export const editEvent = async (
  id: string,
  event: PartialEvent,
  userId: string
): Promise<Event | null> => {
  const table = "events";
  const { query, values } = dbQuery(event, id, table);
  if (values.length <= 0) return null;
  try {
    await db.execute(query, values);
    const updatedEvent = await getEventById(id, userId);
    if (!updatedEvent) return null;

    return updatedEvent;
  } catch (err) {
    console.error("Event cannot be edited:", err);
    return null;
  }
};

export const getAllEvents = async (userId: string): Promise<Event[] | null> => {
  try {
    const [rows] = await db.execute(
      `SELECT ${EVENT_SELECT_FIELDS} FROM events WHERE userId = UUID_TO_BIN(?)`,
      [userId]
    );
    return rows as Event[];
  } catch (err) {
    console.error("Error getting all events:", err);
    return null;
  }
};

interface Permissions {
  isAllowed: boolean;
}

export const checkPermissions = async (userId: string): Promise<boolean> => {
  try {
    const [rows] = await db.execute(
      "SELECT isAllowed FROM users WHERE id = UUID_TO_BIN(?)",
      [userId]
    );
    const permission = (rows as Permissions[])[0].isAllowed ?? false;
    return permission;
  } catch (err) {
    console.error("Error getting permisions", err);
    return false;
  }
};
