import { Hono } from 'hono'

import { buildDbClient } from '../db'
import { users } from '../../db/schema/users'
import { jwtHandler } from '../auth'
import { pbkdf2 } from '../utils/auth'

const router = new Hono()

router.use('/*', jwtHandler)

router.get('/', (c) => {
    return c.text('List of users')
})

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const key: string = await pbkdf2(body.password)

    const user = {
        username: body.username,
        key
    }

    await db.insert(users).values(user)

    return c.body(null, 204)
})

export default router;
