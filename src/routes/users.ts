import { Hono } from 'hono'

const router = new Hono()

router.get('/', (c) => {
    return c.text('List of users')
})

export default router;
