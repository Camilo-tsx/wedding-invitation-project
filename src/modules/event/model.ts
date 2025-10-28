import { InferInput } from "valibot";
import { eventSchema, validatePartialEvent } from "../../schemas/event.schema";

export type PartialEvent = InferInput<typeof validatePartialEvent>;

export type Event = InferInput<typeof eventSchema> & {
  id: string;
  userId?: string;
};
