# PartRelate - API

Made with Hono + Cloudflare Worker

## Config

Fill `.env` and `wrangler.toml [vars]`:
```
DB_URL
DB_AUTH_TOKEN
```

### Turso

Generate migration with drizzle: `npm run generate`

To execute table creation to Turso: `npm run push`

### Cloudflare Worker

Deploy: `npm run deploy`