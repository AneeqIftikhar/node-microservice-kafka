import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json({ message: "Cart Created" });
  }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Get Cart" });
});
router.patch(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Update Cart" });
  }
);
router.delete(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Delete Cart" });
  }
);

export default router;
