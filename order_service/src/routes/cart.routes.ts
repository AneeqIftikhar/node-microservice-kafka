import express, { NextFunction, Request, Response } from "express";
import {
  CreateCart,
  DeleteCart,
  FindCart,
  UpdateCart,
} from "../services/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import {
  CartAddRequestInput,
  CartAddRequestSchema,
} from "../dto/cartRequest.dto";
const router = express.Router();
const repo = repository.CartRepository;
router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = ValidateRequest<CartAddRequestInput>(
        req.body,
        CartAddRequestSchema
      );
      if (errors) {
        return res.status(400).json({ errors });
      }
      const response = await CreateCart(req.body, repo);
      res.status(201).json(response);
    } catch (err) {}
  }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  const response = await FindCart(req.body, repo);
  res.status(200).json(response);
});
router.patch(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await UpdateCart(req.body, repo);
    res.status(200).json(response);
  }
);
router.delete(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await DeleteCart(req.body, repo);
    res.status(200).json(response);
  }
);

export default router;
