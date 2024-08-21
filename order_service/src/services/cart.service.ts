import { CartRepositoryType } from "../types/repository.type";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  const product = await GetProductDetails(input.productId);
  if (product.stock < input.qty) {
    throw new Error("product is out of stock");
  }
  const cart = await repo.create(input);
  return {
    cart,
    product,
  };
};
export const FindCart = async (input: any, repo: CartRepositoryType) => {
  return { message: "Found" };
};
export const UpdateCart = async (input: any, repo: CartRepositoryType) => {
  return { message: "Updated" };
};
export const DeleteCart = async (input: any, repo: CartRepositoryType) => {
  return { message: "Deleted" };
};
