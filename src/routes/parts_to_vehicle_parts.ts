import { Hono } from 'hono'
import { buildDbClient } from '../db'
import { partToVehiclePartSchema } from '../schemas/part-to-vehicle-part'
import { partsToVehicleParts } from '../../db/schema/parts_to_vehicle_parts'
import { idParam } from '../requests/id-param'
import { eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

const router = new Hono()

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const data = partToVehiclePartSchema.parse(body)

    const returning = await db.insert(partsToVehicleParts).values(data).returning()

    return c.json(returning)
})

router.delete('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const deleted = await db
        .delete(partsToVehicleParts)
        .where(eq(partsToVehicleParts.id, id))
        .returning()
    
    if (!deleted) throw new HTTPException(404, { message: 'Not found' })

    return c.json(deleted)
})

export default router