import axios from "axios";
import { logger } from "../logger";
import { APIError } from "../error";
import { Product } from "../../dto/product.dto";
const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:8001";
export const GetProductDetails = async (productId: number) => {
  try {
    const resp = await axios.get(`${CATALOG_BASE_URL}/products/${productId}`);
    return resp.data as Product;
  } catch (err) {
    logger.error(err);
    throw new APIError("Product not found")
  }
  return {
    stock: 10,
    price: 100,
  };
};
