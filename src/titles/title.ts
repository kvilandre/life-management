import { z } from "zod";

export const titleSchema = z.object({
  titleId: z.number(),
  name: z.string(),
  abbreviation: z.string(),
  isSuffix: z.boolean(),
  organizationId: z.number(),
  organization: z.object({
    organizationId: z.number(),
    abbreviation: z.string(),
    name: z.string(),
  }),
  sportId: z.number(),
  sport: z.object({
    sportId: z.number(),
    name: z.string(),
  }),
});

export type Title = z.infer<typeof titleSchema>;
