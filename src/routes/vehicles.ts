import { Hono } from 'hono'
import { eq, sql } from 'drizzle-orm'

import { buildDbClient } from '../db'
import { vehicles } from '../../db/schema/vehicles'
import { paginationParams } from '../requests/pagination-params'
import { keywordParams } from '../requests/keyword-params'

const router = new Hono()

router.get('/', async (c) => {
    const words = keywordParams(c.req)
    const { page } = paginationParams(c.req)
    const pageLimit = 20

    const db = buildDbClient(c)

    const result = await db
        .select()
        .from(vehicles)
        //.where(sql`${vehicles.name} like %${keyword}%`)
        .limit(pageLimit)
        .offset((page - 1) * pageLimit)
        .orderBy(vehicles.name)

    return c.json(result)
})

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()

    const vehicle = {
        name: body.name
    }

    const returning = await db.insert(vehicles).values(vehicle).returning()

    return c.text(returning[0].id.toString(), 200)
})

router.delete('/:id', async (c) => {
    const id: number = parseInt(c.req.param('id'))
    const db = buildDbClient(c)

    const deletedVehicle = await db
        .delete(vehicles)
        .where(eq(vehicles.id, id))
        .returning()
    
    return c.text(deletedVehicle[0].id.toString())
})

export default router
