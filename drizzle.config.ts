import 'dotenv/config'
import type { Config } from 'drizzle-kit'
 
export default {
	schema: './db/schema/*.ts',
	out: './drizzle/migrations',
	driver: 'turso',
	dbCredentials: {
        url: process.env.DB_URL || 'http://127.0.0.1:8080',
		authToken: process.env.DB_AUTH_TOKEN || ''
	},
} satisfies Config
