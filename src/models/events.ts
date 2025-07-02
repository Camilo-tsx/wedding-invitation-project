import { date, InferInput, maxLength, minLength, object, pipe, string } from "valibot";
import { db } from "./mysql/eventmanagerDb";
import { EVENT_SELECT_FIELDS } from "./events.model";

const husbandName = pipe(string(), minLength(3, "Your partner name must contain at least 3 characters"), maxLength(40, "Your partner name can not contain more than 40 characters please"))
const wifeName = pipe(string(), minLength(3, "Your partner name must contain at least 3 characters"), maxLength(40, "Your partner name can not contain more than 40 characters please"))
const eventDate = pipe(date())
const location = pipe(string(), minLength(5, "Your location must contain at least 5 characters"), maxLength(200, "Your location can not contain more than 200 characters"))
const itinerary = pipe(string(), minLength(5, "Your itinerary must contain at least 5 characters"), maxLength(200, "Your itinerary can not contain more than 200 characters"))
const dressCode = pipe(string(), minLength(3, "Your dress code must contain at least 3 characters"), maxLength(100, "Your dress code can not contain more than 100 characters"))

 const eventsSchema = object({
    husbandName,
    wifeName,
    eventDate,
    location,
    itinerary,
    dressCode
})

export type Event = InferInput<typeof eventsSchema> & {
    id: string,    
    userId?: string, 
}


export const createEvent = async (userId: string, inputValues: Event): Promise<Event | null> => {
    const id = crypto.randomUUID();
    try {
    await db.execute(
        "INSERT INTO events (id, userId, eventDate, location, itinerary, dressCode, husbandName, wifeName) VALUES(UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?,?,?,?)", 
        [id, userId, inputValues.eventDate, inputValues.location, inputValues.itinerary, inputValues.dressCode, inputValues.husbandName, inputValues.wifeName 

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

export const getEventById = async (id: string): Promise<Event | null> => {
    try {
    const [rows] = await db.execute(
        `SELECT ${EVENT_SELECT_FIELDS} FROM events WHERE id = UUID_TO_BIN(?)`,
        [id]
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

export const editEvent = async (id: string, event: Event): Promise<Event | null> => {
    try {
    await db.execute(
        "UPDATE events SET eventDate= ?, location= ?, itinerary= ?, dressCode= ?, husbandName= ?, wifeName= ? WHERE id= UUID_TO_BIN(?)",
        [event.eventDate, event.location, event.itinerary, event.dressCode, event.husbandName, event.wifeName, id]
    )
    const updatedEvent = await getEventById(id)
    if (!updatedEvent) return null;

    return updatedEvent
    } catch (err) {
        console.error("Event cannot be edited:", err)
        return null;
    }

}
