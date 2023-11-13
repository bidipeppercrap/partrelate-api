import { Hono } from 'hono'

import notFoundHandler from './routes/not-found'
import index from './routes/index'
import users from './routes/users'

const app = new Hono()

app.route('/', index)
app.route('/users', users)
app.notFound(notFoundHandler)

export default app
