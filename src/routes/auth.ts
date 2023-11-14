import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { loginSchema } from '../schemas/login'
import { buildDbClient } from '../db'
import { users } from '../../db/schema/users'
import { eq, sql } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { pbkdf2, pbkdf2Verify } from '../utils/auth'

const router = new Hono()

router.post('/root', async (c) => {
    const db = buildDbClient(c)
    const countQuery = await db
        .select({
            count: sql<number>`cast(count(${users.id}) as int)`
        })
        .from(users)
    const count = countQuery[0].count

    if (count > 0) throw new HTTPException(401, { message: 'Root is already created' })

    const body = await c.req.json()
    const credential = loginSchema.parse(body)

    const key = await pbkdf2(credential.password) // TO HASH

    const user = {
        username: credential.username,
        key
    }

    await db.insert(users).values(user)
    
    return c.newResponse(null, 201)
})

router.post('/login', async (c) => {
    const body = await c.req.json()
    const credential = loginSchema.parse(body)
    const db = buildDbClient(c)

    const user = await db.query.users.findFirst({
        where: eq(users.username, credential.username)
    })

    if (!user) throw new HTTPException(404, { message: 'Username not found' })

    const verified = await pbkdf2Verify(user.key, credential.password)

    if (!verified) throw new HTTPException(400, { message: 'Incorrect password' })

    const token = await sign({
        sub: user.username
    }, 'test')

    return c.text(token)
})

export default router