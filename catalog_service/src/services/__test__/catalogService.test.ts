import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
const mockProduct = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 5, max: 100 }),
    price: +faker.commerce.price(), //casting it as number
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
      const result = await service.createProduct(mockProduct());
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
      await expect(service.createProduct(mockProduct())).rejects.toThrow(
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
      await expect(service.createProduct(mockProduct())).rejects.toThrow(
        "product already exsists"
      );
    });
  });
});
