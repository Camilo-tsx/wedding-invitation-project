import { guestSchema, partialGuestSchema } from "@/schemas/guest.schema";
import { InferInput } from "valibot";

export type Guest = InferInput<typeof guestSchema> & {
  id: string;
  eventId?: string;
};

export type PartialGuest = InferInput<typeof partialGuestSchema>;
