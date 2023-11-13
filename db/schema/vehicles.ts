import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const vehicles = sqliteTable('vehicles', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'), // used to details the vehicle
    note: text('note') // used to highlight if something about this vehicle needed attention
}, (vehicles) => ({
    nameIdx: uniqueIndex('vehicle_name_idx').on(vehicles.name)
}))
