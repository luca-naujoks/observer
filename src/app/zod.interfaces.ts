import { z } from "zod";

export const ZProvider = z.object({
  name: z.string(),
  fetchData: z.function(),
  trending: z.function().optional(),
  schedule: z.string(),
});
