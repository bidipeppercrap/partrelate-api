import { Hono } from 'hono'
import { keywordParams } from '../requests/keyword-params'
import { paginationParams } from '../requests/pagination-params'
import { buildDbClient } from '../db'
import { SQL, and, eq, like } from 'drizzle-orm'
import { vehicleParts } from '../../db/schema/vehicle_parts'
import { vehiclePartSchema } from '../schemas/vehicle-part'
import { idParam } from '../requests/id-param'
import { HTTPException } from 'hono/http-exception'
import { vehicles } from '../../db/schema/vehicles'
import { jwtHandler } from '../auth'
import { paginatedResponse } from '../responses/paginated'

const router = new Hono()

router.use('/*', jwtHandler)

router.get('/', async (c) => {
    const { words } = keywordParams(c.req)
    const { page } = paginationParams(c.req)
    const pageLimit = 20

    const db = buildDbClient(c)
    const likeQueries: SQL<unknown>[] = words.map(word => like(vehicleParts.name, `%${word}%`))

    const result = await db
        .select()
        .from(vehicleParts)
        .where(and(...likeQueries))
        .limit(pageLimit)
        .offset((page - 1) * pageLimit)
        .orderBy(vehicleParts.name)
    
    const response = await paginatedResponse(c, vehicleParts, likeQueries, pageLimit, result)

    return c.json(response)
})

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const vehiclePart = vehiclePartSchema.parse(body)

    const vehicle = await db.query.vehicles.findFirst({
        where: eq(vehicles.id, vehiclePart.vehicleId)
    })

    if (!vehicle) throw new HTTPException(400, { message: 'Vehicle not found' })

    const returning = await db.insert(vehicleParts).values(vehiclePart).returning()

    return c.json(returning)
})

router.get('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const vehiclePart = await db.query.vehicleParts.findFirst({
        where: eq(vehicleParts.id, id)
    })

    if (!vehiclePart) throw new HTTPException(404, { message: 'Vehicle Part not found'})

    return c.json(vehiclePart)
})

router.put('/:id', async (c) => {
    const { id } = idParam(c.req)
    const body = await c.req.json()
    const vehiclePart = vehiclePartSchema.parse(body)

    const db = buildDbClient(c)

    const returning = await db.update(vehicleParts)
        .set(vehiclePart)
        .where(eq(vehicleParts.id, id))
        .returning()
    
    if (returning.length < 1) throw new HTTPException(404, { message: 'Vehicle Part not found'})

    return c.json(returning)
})

router.delete('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const deletedVehiclePart = await db
        .delete(vehicleParts)
        .where(eq(vehicleParts.id, id))
        .returning()

    if (deletedVehiclePart.length < 1) throw new HTTPException(404, { message: 'Vehicle Part not found' })

    return c.json(deletedVehiclePart)
})

export default router