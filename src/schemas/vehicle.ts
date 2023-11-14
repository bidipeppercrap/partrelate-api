import { z } from "zod";

export const vehicleSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    note: z.string().optional()
})
