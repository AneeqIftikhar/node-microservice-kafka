import { CartRepositoryType } from "../types/repository.type";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  const product = await GetProductDetails(input.productId);
  if (product.stock < input.qty) {
    throw new Error("product is out of stock");
  }
  return await repo.create(input);
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
