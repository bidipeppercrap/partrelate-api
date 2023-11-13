import { Context } from "hono"

export default (c: Context) => {
    return c.text('I dont know where it is', 404)
}
