import { HonoRequest } from 'hono';

type Partial = {
    query: {
        page: string
    }
}

export function paginationParams(req: HonoRequest<'/', Partial>) {
    const pageQuery = parseInt(req.query('page') ?? '1')
    const page: number = isNaN(pageQuery) ? 1 : pageQuery

    return {
        page
    }
}