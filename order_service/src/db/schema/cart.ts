import { InferSelectModel } from "drizzle-orm";
import { pgTable, integer, serial, timestamp } from "drizzle-orm/pg-core";
export const carts = pgTable("carts", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().unique(),
    createAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow()
})

export type Cart = InferSelectModel<typeof carts>;