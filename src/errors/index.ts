import { Env, ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError} from 'zod'

export const errorHandler: ErrorHandler<Env> = (err, c) => {
    if (err instanceof HTTPException) {
        return err.getResponse()
    }
    if (err instanceof ZodError) {
        return c.json(err.errors, 400)
    }

    return c.json({
        message: "Unexpected error",
        errors: err.message
    }, 500)
}