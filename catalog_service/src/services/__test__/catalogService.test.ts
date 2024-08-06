import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
import { Factory } from "rosie";
const productFactory = new Factory<Product>()
  .attr("id", faker.number.int({ min: 1, max: 1000 }))
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", +faker.commerce.price());

const mockProduct = (data: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 5, max: 100 }),
    price: +faker.commerce.price(), //casting it as number
    ...data,
  };
};
describe("catalogService", () => {
  let repository: ICatalogRepository;
  beforeEach(() => {
    repository = new MockCatalogRepository();
  });
  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });
  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const result = await service.createProduct(mockProduct({}));
      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });
    test("should throw error with unable to create product", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));
      await expect(service.createProduct(mockProduct({}))).rejects.toThrow(
        "unable to create product"
      );
    });
    test("should throw error with product already exists", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exsists"))
        );
      await expect(service.createProduct(mockProduct({}))).rejects.toThrow(
        "product already exsists"
      );
    });
  });
  describe("updateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqData = mockProduct({
        price: 2,
      });
      const result = await service.updateProduct(reqData);
      expect(result).toMatchObject(reqData);
    });
    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exsists"))
        );
      await expect(service.updateProduct(mockProduct({}))).rejects.toThrow(
        "product doesn't exsists"
      );
    });
  });
  describe("getProducts", () => {
    test("should get products by limit and offset", async () => {
      const service = new CatalogService(repository);
      const products = productFactory.buildList(10);
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));
      const result = await service.getProducts(10, 0);
      expect(result.length).toEqual(10);
      expect(result).toMatchObject(products);
    });
    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exsists"))
        );
      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "product doesn't exsists"
      );
    });
  });
  describe("getProduct", () => {
    test("should get products by limit and offset", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();
      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));
      const result = await service.getProduct(product.id!); //Force to get it with !
      expect(result).toMatchObject(product);
    });
    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exsists"))
        );
      await expect(service.getProduct(1)).rejects.toThrow(
        "product doesn't exsists"
      );
    });
  });
  describe("deleteProduct", () => {
    test("should delete product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();
      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() => Promise.resolve({ id: product.id }));
      const result = await service.deleteProduct(product.id!); //Force to get it with !
      expect(result).toMatchObject({ id: product.id });
    });
    test("should throw error with product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "delete")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product doesn't exsists"))
        );
      await expect(service.deleteProduct(1)).rejects.toThrow(
        "product doesn't exsists"
      );
    });
  });
});
