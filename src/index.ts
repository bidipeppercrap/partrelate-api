import { Hono } from 'hono'
import { cors } from 'hono/cors'

import notFoundHandler from './routes/not-found'
import index from './routes/index'
import auth from './routes/auth'
import users from './routes/users'
import vehicles from './routes/vehicles'
import parts from './routes/parts'
import vehicleParts from './routes/vehicle_parts'
import partsToVehicleParts from './routes/parts_to_vehicle_parts'
import { errorHandler } from './errors'

const app = new Hono()

app.use('/*', cors())

app.route('/', index)
app.route('/', auth)
app.route('/users', users)
app.route('/vehicles', vehicles)
app.route('/parts', parts)
app.route('/vehicle_parts', vehicleParts)
app.route('/parts_to_vehicle_parts', partsToVehicleParts)

app.notFound(notFoundHandler)
app.onError(errorHandler)

export default app
