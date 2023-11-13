import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const client = createClient({
    url: 'libsql://127.0.0.1:8080',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDA0Njk4OTcsImlhdCI6MTY5OTg2NTA5NywiaWQiOjM2NTd9.cp5JZjJ20J-5AFQqb7hgWYDNuuodX1SvF4NX_UTLCrA'
})

export const db = drizzle(client)
