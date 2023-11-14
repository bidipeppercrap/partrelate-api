import { Hono } from 'hono'

import { buildDbClient } from '../db'
import { partSchema } from '../schemas/part'
import { parts } from '../../db/schema/parts'
import { keywordParams } from '../requests/keyword-params'
import { paginationParams } from '../requests/pagination-params'
import { idParam } from '../requests/id-param'
import { eq } from 'drizzle-orm'

const router = new Hono()

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const part = partSchema.parse(body)

    const returning = await db.insert(parts).values(part).returning()

    return c.text(returning[0].id.toString(), 200)
})

router.get('/', async (c) => {
    const { words } = keywordParams(c.req)
    const { page } = paginationParams(c.req)
    const pageLimit = 20
    
    const db = buildDbClient(c)

    let whereQuery = db.select().from(parts)

    const result = await whereQuery
        .limit(pageLimit)
        .offset((page - 1) * pageLimit)
        .orderBy(parts.name)
    
    return c.json(result)
})

router.delete('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const deletedPart = await db
        .delete(parts)
        .where(eq(parts.id, id))
        .returning()
    
    return c.text(deletedPart[0].id.toString())
})

export default router
