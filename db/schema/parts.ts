import { relations } from 'drizzle-orm'
import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { partsToVehicleParts } from './part_to_vehicle_part'

export const parts = sqliteTable('parts', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    note: text('note')
}, (parts) => ({
    nameIdx: uniqueIndex('part_name_idx').on(parts.name)
}))

export const partsRelation = relations(parts, ({ many }) => ({
    partsToVehicleParts: many(partsToVehicleParts)
}))
