import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker";
import catalogRoutes from "../catalog.route";

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
        const requestBody = mockRequest({});
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");

      console.log(response);

      expect(response.status).toBe(201);
    });
  });
});
