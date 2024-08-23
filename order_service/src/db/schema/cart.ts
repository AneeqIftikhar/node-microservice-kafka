import { InferSelectModel, relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  timestamp,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().unique(),
  createAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>;

export const cartLineItems = pgTable("cart_line_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  cartId: integer("cart_id")
    .references(() => carts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  itemName: varchar("item_name").notNull(),
  qty: integer("qty"),
  price: numeric("price"),
  createAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type CartLineItem = InferSelectModel<typeof cartLineItems>;

export const cartRelations = relations(carts, ({ many }) => ({
  lineItems: many(cartLineItems),
}));

export const cartLineItemsRelations = relations(cartLineItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartLineItems.cartId],
    references: [carts.id],
  }),
}));
