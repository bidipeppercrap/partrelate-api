import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const parts = sqliteTable('parts', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    note: text('note')
}, (parts) => ({
    nameIdx: uniqueIndex('part_name_idx').on(parts.name)
}))
