import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { Context, Env } from 'hono'

import * as schema from '../db/schema/schema'

interface DbEnv {
    DB_AUTH_TOKEN?: string;
    DB_URL?: string;
}

export function buildDbClient(context: Context<Env, '/', {}>) {
    const c = (context.env as unknown as DbEnv)

    return drizzle(createClient({
        url: c.DB_URL || 'http://127.0.0.1:8080',
        authToken: c.DB_AUTH_TOKEN
    }), { schema })
}
