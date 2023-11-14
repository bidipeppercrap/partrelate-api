import { HonoRequest } from 'hono';
import { HTTPException } from 'hono/http-exception';

type Partial = {
    param: {
        id: number
    }
}

export function idParam(req: HonoRequest<"/:id", Partial>) {
    const id: number = parseInt(req.param('id'))
    
    if (isNaN(id)) throw new HTTPException(400, { message: 'Id is not a valid.' })

    return {
        id
    }
}