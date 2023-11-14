import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { vehicleParts } from './vehicle_parts'
import { parts } from './parts'
import { relations } from 'drizzle-orm'

export const partsToVehicleParts = sqliteTable('parts_to_vehicle_parts', {
    id: integer('id').primaryKey(),
    description: text('description'), // used to describe the usage of the part in the vehicle e.g. Left: 6201 2RS / Right: 6301 2RS
    quantity: text('quantity'),
    vehiclePartId: integer('vehicle_part_id').notNull().references(() => vehicleParts.id),
    partId: integer('part_id').notNull().references(() => parts.id),
})

export const partsToVehiclePartsRelation = relations(partsToVehicleParts, ({ one }) => ({
    vehicleParts: one(vehicleParts, {
        fields: [partsToVehicleParts.vehiclePartId],
        references: [vehicleParts.id]
    }),
    parts: one(parts, {
        fields: [partsToVehicleParts.partId],
        references: [parts.id]
    })
}))