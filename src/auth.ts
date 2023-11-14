import { jwt } from 'hono/jwt';

export const jwtHandler = jwt({
    secret: 'test'
})
