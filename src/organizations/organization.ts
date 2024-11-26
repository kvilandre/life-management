import { z } from "zod";

export const organizationSchema = z.object({
  organizationId: z.number(),
  abbreviation: z.string(),
  name: z.string(),
});

export type Organization = z.infer<typeof organizationSchema>;
