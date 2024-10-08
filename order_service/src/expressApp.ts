import express, { Request, NextFunction, Response } from "express";
import cors from 'cors';
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";
import { httpLogger, HandleErrorWithLogger } from "./utils";


const app = express();
app.use(cors());
app.use(express.json());
app.use(cartRouter);
app.use(orderRouter);
app.use(httpLogger);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "API is Live" })
});
app.use(HandleErrorWithLogger);
export default app;