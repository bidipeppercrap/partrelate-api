import { Hono } from 'hono'
import { SQL, and, eq, like } from 'drizzle-orm'

import { buildDbClient } from '../db'
import { vehicles } from '../../db/schema/vehicles'
import { paginationParams } from '../requests/pagination-params'
import { keywordParams } from '../requests/keyword-params'
import { vehicleSchema } from '../schemas/vehicle'
import { idParam } from '../requests/id-param'
import { HTTPException } from 'hono/http-exception'
import { jwtHandler } from '../auth'
import { paginatedResponse } from '../responses/paginated'

const router = new Hono()

router.use('/*', jwtHandler)

router.get('/', async (c) => {
    const { words } = keywordParams(c.req)
    const { page } = paginationParams(c.req)
    const pageLimit = 20

    const db = buildDbClient(c)
    const likeQueries: SQL<unknown>[] = words.map(word => like(vehicles.name, `%${word}%`))

    const result = await db
        .select({
            id: vehicles.id,
            name: vehicles.name
        })
        .from(vehicles)
        .where(and(...likeQueries))
        .limit(pageLimit)
        .offset((page - 1) * pageLimit)
        .orderBy(vehicles.name)
    
    const response = await paginatedResponse(c, vehicles, likeQueries, pageLimit, result)

    return c.json(response)
})

router.post('/', async (c) => {
    const db = buildDbClient(c)
    const body = await c.req.json()
    const vehicle = vehicleSchema.parse(body)

    const returning = await db.insert(vehicles).values(vehicle).returning()

    return c.json(returning)
})

router.get('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const vehicle = await db.query.vehicles.findFirst({
        with: {
            vehicleParts: {
                with: {
                    partsToVehicleParts: {
                        with: {
                            parts: true
                        }
                    }
                }
            }
        },
        where: eq(vehicles.id, id)
    })

    if (!vehicle) throw new HTTPException(404, {
        message: 'Vehicle not found'
    })

    return c.json(vehicle)
})

router.put('/:id', async (c) => {
    const { id } = idParam(c.req)
    const body = await c.req.json()
    const vehicle = vehicleSchema.parse(body)

    const db = buildDbClient(c)

    const returning = await db.update(vehicles)
        .set(vehicle)
        .where(eq(vehicles.id, id))
        .returning()
    
    if (returning.length < 1) throw new HTTPException(404, { message: 'Vehicle not found' })
    
    return c.json(returning)
})

router.delete('/:id', async (c) => {
    const { id } = idParam(c.req)
    const db = buildDbClient(c)

    const deletedVehicle = await db
        .delete(vehicles)
        .where(eq(vehicles.id, id))
        .returning()
    
    if (deletedVehicle.length < 1) throw new HTTPException(404, { message: 'Vehicle not found' })
    
    return c.json(deletedVehicle)
})

export default router
