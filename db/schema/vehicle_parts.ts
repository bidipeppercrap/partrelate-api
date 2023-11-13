import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { vehicles } from './vehicles'

export const vehicleParts = sqliteTable('vehicle_parts', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    vehicleId: integer('vehicle_id').references(() => vehicles.id)
}, (vehicleParts) => ({
    nameIdx: uniqueIndex('vehicle_part_name_idx').on(vehicleParts.name)
}))
