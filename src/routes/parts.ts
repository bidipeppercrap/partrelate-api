import { Hono } from 'hono'

import { buildDbClient } from '../db'
import { partSchema } from '../schemas/part'
import { parts } from '../../db/schema/parts'
import { keywordParams } from '../requests/keyword-params'
import { paginationParams } from '../requests/pagination-params'
import { idParam } from '../requests/id-param'
import { SQL, and, eq, like, sql } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { jwtHandler } from '../auth'
import { paginatedResponse } from '../responses/paginated'

const router = new Hono()

router.use('/*', jwtHandler)

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const part = partSchema.parse(body)

    const returning = await db.insert(parts).values(part).returning()

    return c.json(returning)
})

router.get('/', async (c) => {
    const { words } = keywordParams(c.req)
    const { page } = paginationParams(c.req)
    const pageLimit = 20
    
    const db = buildDbClient(c)
    const likeQueries: SQL<unknown>[] = words.map(word => like(parts.name, `%${word}%`))

    const result = await db
        .select({
            id: parts.id,
            name: parts.name
        })
        .from(parts)
        .where(and(...likeQueries))
        .limit(pageLimit)
        .offset((page - 1) * pageLimit)
        .orderBy(parts.name)
    
    const response = await paginatedResponse(c, parts, pageLimit, result)
    
    return c.json(response)
})

router.get('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const part = await db.query.parts.findFirst({
        where: eq(parts.id, id)
    })

    if (!part) throw new HTTPException(404, {
        message: 'Part not found'
    })

    return c.json(part)
})

router.delete('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const deletedPart = await db
        .delete(parts)
        .where(eq(parts.id, id))
        .returning()
    
    if (!deletedPart) throw new HTTPException(404, { message: 'Part not found' })
    
    return c.json(deletedPart)
})

export default router
