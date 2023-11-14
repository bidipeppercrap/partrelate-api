import { z } from 'zod';

export const partSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    note: z.string().optional()
})
