import { boolean, date, InferInput, maxLength, minLength, object, partial, pipe, string } from "valibot";
import { db } from "./mysql/eventmanagerDb";
import { EVENT_SELECT_FIELDS } from "../utils/dbQuerys/events.model";
import { dbQuery } from "../utils/dbQuerys/dbQuery";

const husbandName = pipe(string(), minLength(3, "Your partner name must contain at least 3 characters"), maxLength(40, "Your partner name can not contain more than 40 characters please"))
const wifeName = pipe(string(), minLength(3, "Your partner name must contain at least 3 characters"), maxLength(40, "Your partner name can not contain more than 40 characters please"))
const eventDate = pipe(date())
const location = pipe(string(), minLength(5, "Your location must contain at least 5 characters"), maxLength(200, "Your location can not contain more than 200 characters"))
const itinerary = pipe(string(), minLength(5, "Your itinerary must contain at least 5 characters"), maxLength(200, "Your itinerary can not contain more than 200 characters"))
const dressCode = pipe(string(), minLength(3, "Your dress code must contain at least 3 characters"), maxLength(100, "Your dress code can not contain more than 100 characters"))
const specialMenu = boolean()
const kidsAllowed = boolean()

export const eventSchema = object({
    husbandName,
    wifeName,
    eventDate,
    location,
    itinerary,
    dressCode,
    kidsAllowed,
    specialMenu
})

export const validatePartialEvent = partial(eventSchema)

export type PartialEvent = InferInput<typeof validatePartialEvent>

export type Event = InferInput<typeof eventSchema> & {
    id: string,    
    userId?: string, 
}


export const createEvent = async (userId: string, inputValues: Omit<Event, "id">): Promise<Event | null> => {
    const id = crypto.randomUUID();
    try {
    await db.execute(
        "INSERT INTO events (id, userId, eventDate, location, itinerary, dressCode, husbandName, wifeName, kidsAllowed, specialMenu) VALUES(UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,?,?,?,?,?)", 
        [id, userId, inputValues.eventDate, inputValues.location, inputValues.itinerary, inputValues.dressCode, inputValues.husbandName, inputValues.wifeName , inputValues.kidsAllowed, inputValues.specialMenu

        ])
        const newEvent = {
        ...inputValues,
        id,
        userId
       
        }

        return newEvent
    
        } catch (err) {
            console.error("An error creating the event has ocurred:", err)
            return null;
        }
    
}

export const getEventById = async (id: string, userId: string): Promise<Event | null> => {
    try {
    const [rows] = await db.execute(
        `SELECT ${EVENT_SELECT_FIELDS} FROM events WHERE id = UUID_TO_BIN(?) and userId = UUID_TO_BIN(?)`,
        [id, userId] 
    )
    const event = (rows as Event[])[0];
    if (!event) return null;

    return event
    } catch (err) {
        console.error("Error getting email:", err)
        return null;
    }

    
}

export const deleteEvent = async (id: string): Promise <boolean> => {
    try {
    await db.execute(
        "DELETE FROM events WHERE id = UUID_TO_BIN(?)",
        [id]
    )
    return true
    } catch (err) {
        console.error("Event can not be deleted:", err);
        return false;
    }
}

export const editEvent = async (id: string, event:PartialEvent, userId: string ): Promise<Event | null> => {
    const table = "events"
    const {query, values} = dbQuery(event, id, table)
    if (values.length <= 0) return null;
    try {
    await db.execute(query, values)
    const updatedEvent = await getEventById(id, userId)
    if (!updatedEvent) return null;

    return updatedEvent
    } catch (err) {
        console.error("Event cannot be edited:", err)
        return null;
    }

}

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
    const [rows] = await db.execute("SELECT isAllowed FROM users WHERE id = UUID_TO_BIN(?)", [userId])
    const permission = (rows as Permissions[])[0].isAllowed ?? false;
    return permission
    } catch (err) {
        console.error("Error getting permisions", err)
        return false
    }
}