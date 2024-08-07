import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes, { catalogService } from "../catalog.route";
import { ProductFactory } from "../../utils/fixtures";

const app = express();
app.use(express.json());
app.use(catalogRoutes);

const mockRequest = (remaining: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 5, max: 100 }),
    price: +faker.commerce.price(),
    ...remaining,
  };
};

describe("Catalog Request", () => {
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const product = ProductFactory.build();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const requestBody = mockRequest({});
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      console.log(response);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(product);
    });
    test("should respond with internal error code 500", async () => {
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.reject(new Error("error occurred on create product")));

      const requestBody = mockRequest({});
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      console.log(response);

      expect(response.status).toBe(500);
      expect(response.body).toEqual("error occurred on create product");
    });
    test("should respond with validation error 400", async ()=> {
      const requestBody = mockRequest({});
      const response = await request(app)
        .post("/products")
        .send({...requestBody, name:""})
        .set("Accept", "application/json");

      console.log(response);

      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });
  });
});
