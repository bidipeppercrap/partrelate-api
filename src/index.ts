import { Hono } from 'hono'

import notFoundHandler from './routes/not-found'
import index from './routes/index'
import users from './routes/users'

type Bindings = {
    DB_URL: string,
    DB_AUTH_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.route('/', index)
app.route('/users', users)
app.notFound(notFoundHandler)

export default app
