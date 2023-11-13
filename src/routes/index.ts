import { Hono } from 'hono'

const router = new Hono()

router.get('/', (c) => {
    const about = {
        name: 'PartRelate',
        author: {
            name: 'bidipeppercrap',
            phone: '+62 851 7171 9191',
            mail: 'bidipeppercrap@proton.me'
        },
    }

    return c.json(about)
})

export default router
