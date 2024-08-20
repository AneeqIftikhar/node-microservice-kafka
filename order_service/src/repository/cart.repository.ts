import { DB } from "../db/db.connection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.type";

const createCart = async (input: any) => { 
  const result = await DB.insert(carts)
    .values({
      customerId: input.customerId,
    })
    .returning({ cartId: carts.id });

  console.log(result);
  return Promise.resolve({ message: "fake response from cart repository" });
};
const updateCart = async (input: any) => {
  return Promise.resolve({ message: "fake response from cart repository" });
};
const findCart = async (input: any) => {
  return Promise.resolve({ message: "fake response from cart repository" });
};
const deleteCart = async (input: any) => {
  return Promise.resolve({ message: "fake response from cart repository" });
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart,
};
