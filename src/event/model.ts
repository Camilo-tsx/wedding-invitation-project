import { InferInput } from "valibot";
import { eventSchema, validatePartialEvent } from "./validation";

export type PartialEvent = InferInput<typeof validatePartialEvent>;

export type Event = InferInput<typeof eventSchema> & {
  id: string;
  userId?: string;
};
