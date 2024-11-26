import { z } from "zod";

export const animalCardSchema = z.object({
  shotsNeeded: z.array(z.string()),
  animalImage: z.string(),
  animalValue: z.string(),
  callName: z.string(),
  age: z.number(),
  fullName: z.string(),
  titlesWorkingToward: z.array(
    z.object({
      name: z.string(),
      abbreviation: z.string(),
    })
  ),
  animalId: z.number(),
});

export type AnimalCard = z.infer<typeof animalCardSchema>;
