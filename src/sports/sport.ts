import { z } from "zod";

export const sportSchema = z.object({
  sportId: z.number(),
  name: z.string(),
  organizations: z.array(
    z.object({
      name: z.string(),
      abbreviation: z.string(),
    })
  ),
});

export type Sport = z.infer<typeof sportSchema>;
