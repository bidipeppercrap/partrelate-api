import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { buildDbClient } from "../db";
import { Context, Env } from "hono";
import { sql, SQL, and } from "drizzle-orm";

export async function paginatedResponse(
    c: Context<Env, "/", {}>,
    table: SQLiteTableWithColumns<any>,
    likeQueries: SQL<unknown>[],
    pageLimit: number,
    data: any
) {
    const db = buildDbClient(c)
    const countQuery = await db
        .select({
            count: sql<number>`cast(count(${table.id}) as int)`
        })
        .from(table)
        .where(and(...likeQueries))
    const count = countQuery[0].count
    const totalPages = Math.ceil(count / pageLimit)

    return {
        totalPages,
        data
    }
}