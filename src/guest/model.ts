import { InferInput } from "valibot";
import { guestSchema, partialGuestSchema } from "./validation";

export type Guest = InferInput<typeof guestSchema> & {
  id: string;
  eventId?: string;
};

export type PartialGuest = InferInput<typeof partialGuestSchema>;
