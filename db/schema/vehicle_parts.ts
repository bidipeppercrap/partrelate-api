import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { vehicles } from './vehicles'
import { relations } from 'drizzle-orm'
import { partsToVehicleParts } from './part_to_vehicle_part'

export const vehicleParts = sqliteTable('vehicle_parts', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'), // used to detail something about this part
    note: text('note'), // used to alert you if something needed attention
    vehicleId: integer('vehicle_id').notNull()
}, (vehicleParts) => ({
    nameIdx: uniqueIndex('vehicle_part_name_idx').on(vehicleParts.name)
}))

export const vehiclePartsRelation = relations(vehicleParts, ({ one, many }) => ({
    vehicle: one(vehicles, {
        fields: [vehicleParts.vehicleId],
        references: [vehicles.id]
    }),
    partsToVehicleParts: many(partsToVehicleParts)
}))
