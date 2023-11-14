import { z } from 'zod'

export const partToVehiclePartSchema = z.object({
    description: z.string().optional(),
    quantity: z.string().optional(),
    vehiclePartId: z.number().int(),
    partId: z.number().int()
})