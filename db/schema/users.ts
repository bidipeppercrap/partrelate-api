import { text, integer, sqliteTable, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    username: text('username').notNull(),
    key: text('key').notNull()
}, (users) => ({
    usernameIdx: uniqueIndex('usernameIdx').on(users.username)
}))
