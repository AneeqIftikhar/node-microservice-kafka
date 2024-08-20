import { Static, Type } from "@sinclair/typebox";

export const CartAddRequestSchema = Type.Object({
  productId: Type.Integer(),
  customerId: Type.Integer(),
  qty: Type.Integer(),
});

export type CartAddRequestInput = Static<typeof CartAddRequestSchema>;
export const CartEditRequestSchema = Type.Object({
  id: Type.Integer(),
  qty: Type.Integer(),
});

export type CartEditRequestInput = Static<typeof CartEditRequestSchema>;
