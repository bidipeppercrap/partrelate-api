import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const vehicles = sqliteTable('vehicles', {
    id: integer('id').primaryKey(),
    name: text('name').notNull()
}, (vehicles) => ({
    nameIdx: uniqueIndex('vehicle_name_idx').on(vehicles.name)
}))
