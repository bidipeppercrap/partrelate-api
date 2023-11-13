import { Hono } from 'hono'

import { buildDbClient } from '../db'
import { users } from '../../db/schema/users'

const router = new Hono()

router.get('/', (c) => {
    return c.text('List of users')
})

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const key = body.password

    const user = {
        username: body.username,
        key
    }

    const returning = await db.insert(users).values(user).returning()
    return c.text(returning[0].id.toString(), 200)
})

export default router;
