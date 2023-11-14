import { Hono } from 'hono'
import { sign } from 'hono/jwt'
import { loginSchema } from '../schemas/login'
import { buildDbClient } from '../db'
import { users } from '../../db/schema/users'
import { sql } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

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

    const key = credential.password // TO HASH

    const user = {
        username: credential.username,
        key: 'wtf'
    }

    await db.insert(users).values(user)
    
    return c.newResponse(null, 201)
})

router.post('/login', async (c) => {
    const body = await c.req.json()
    const credential = loginSchema.omit({ password: true }).parse(body)
    const token = await sign(credential, 'test')

    return c.text(token)
})

export default router