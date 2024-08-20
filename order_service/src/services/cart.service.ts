import { CartRepositoryType } from "../types/repository.type";

export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  return await repo.create(input)
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
