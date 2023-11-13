import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { Context, Env } from 'hono'

interface DbEnv {
    TURSO_DB_AUTH_TOKEN?: string;
    TURSO_DB_URL?: string;
}

export function buildDbClient(context: Context<Env, '/', {}>) {
    const c = (context.env as unknown as DbEnv)

    return drizzle(createClient({
        url: c.TURSO_DB_URL || 'http://127.0.0.1:8080',
        authToken: c.TURSO_DB_AUTH_TOKEN
    }))
}
