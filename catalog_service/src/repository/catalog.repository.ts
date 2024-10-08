import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;
  constructor() {
    this._prisma = new PrismaClient();
  }
  create(data: Product): Promise<Product> {
    return Promise.resolve(this._prisma.product.create({ data }));
  }
  update(data: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<{}> {
    throw new Error("Method not implemented.");
  }
  find(): Promise<Product[]> {
    return Promise.resolve(this._prisma.product.findMany({}));
  }
  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (product) return Promise.resolve(product);

    throw new Error("Product Not found");
  }
}
