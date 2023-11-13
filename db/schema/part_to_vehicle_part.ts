import { primaryKey, integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const vehiclePartToVehicle = sqliteTable('part_to_vehicle_part', {
    vehiclePartId: integer('vehicle_part_id'),
    partId: integer('part_id'),
}, (table) => ({
    pk: primaryKey({ columns: [table.vehiclePartId, table.partId] })
}))
