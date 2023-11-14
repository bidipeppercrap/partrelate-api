import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { vehicleParts } from './vehicle_parts'
import { parts } from './parts'

export const vehiclePartToVehicle = sqliteTable('part_to_vehicle_part', {
    id: integer('id').primaryKey(),
    description: text('description'), // used to describe the usage of the part in the vehicle e.g. Left: 6201 2RS / Right: 6301 2RS
    quantity: integer('quantity'),
    vehiclePartId: integer('vehicle_part_id').references(() => vehicleParts.id),
    partId: integer('part_id').references(() => parts.id),
})
