import { Hono } from 'hono'

import { buildDbClient } from '../db'
import { users } from '../../db/schema/users'
import { jwtHandler } from '../auth'
import { pbkdf2, pbkdf2Verify } from '../utils/auth'
import { z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { eq } from 'drizzle-orm'

const router = new Hono()

router.use('/*', jwtHandler)

router.get('/', (c) => {
    return c.text('List of users')
})

router.put('/:username', async (c) => {
    const username = c.req.param('username')
    const body = await c.req.json()
    const schema = z.object({
        currentPassword: z.string(),
        newPassword: z.string()
    })
    const { currentPassword, newPassword } = schema.parse(body)
    const db = buildDbClient(c)

    const user = await db.query.users.findFirst({
        where: eq(users.username, username)
    })

    if (!user) throw new HTTPException(404, { message: 'Username not found' })

    const verified = await pbkdf2Verify(user.key, currentPassword)

    if (!verified) throw new HTTPException(400, { message: 'Incorrect current password' })

    const key = await pbkdf2(newPassword)

    await db.update(users)
        .set({ key })
        .where(eq(users.username, user.username))

    return c.body(null, 204)
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
