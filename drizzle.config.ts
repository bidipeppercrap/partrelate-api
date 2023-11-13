import 'dotenv/config'
import type { Config } from 'drizzle-kit'
 
export default {
	schema: './db/schema/*.ts',
	out: './drizzle/migrations',
	driver: 'libsql',
	dbCredentials: {
        url: process.env.DB_URL || 'http://127.0.0.1:8080',
	},
} satisfies Config
