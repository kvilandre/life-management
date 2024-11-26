import { z } from "zod";

export const animalDetailSchema = z.object({
  animalid: z.number(),
  animalImage: z.string(),
  animalValue: z.string(),
  fullName: z.string(),
  callName: z.string(),
  age: z.number(),
  breed: z.string(),
  birthDate: z.string().datetime(),
  weight: z.number(),
  caloriesNeeded: z.number(),
  allergies: z.array(z.string()),
  sports: z.array(
    z.object({
      sportId: z.number(),
      sportName: z.string(),
      organizationId: z.number(),
      organizationAbbr: z.string(),
    })
  ),
});

export type AnimalDetail = z.infer<typeof animalDetailSchema>;
