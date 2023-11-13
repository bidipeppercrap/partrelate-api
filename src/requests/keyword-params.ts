import { HonoRequest } from 'hono';

type Partial = {
    query: {
        keyword: string
    }
}

export function keywordParams(req: HonoRequest<'/', Partial>) {
    const keyword = req.query('keyword') ?? ''
    const words = keyword.trim().split(' ')

    return {
        words
    }
}