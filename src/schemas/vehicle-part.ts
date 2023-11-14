import { z } from 'zod'

export const vehiclePartSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    note: z.string().optional(),
    vehicleId: z.number().int()
})
