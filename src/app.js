import express from "express";
import morgan from "morgan";

import { globalErrorController } from "./controllers/globalErrorController.js";
import { AppError } from "./utils/AppError.js";

import parkingLotRouter from "./routes/vehicleRoutes.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/parking-lot", parkingLotRouter);

app.all(`/{*splat}`, async (req, res, next) => {
  next(new AppError(404, `Resource not found ${req.originalUrl}`));
});

app.use(globalErrorController);

export default app;