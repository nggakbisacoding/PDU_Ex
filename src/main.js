import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./app/logging.js";
import { privateRouter } from "./router/private.routes.js";
import { publicRouter } from "./router/public.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { docs } from "./docs/openapi.js";
import swaggerUi from "swagger-ui-express";
import { mlRouter } from "./router/ml.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(privateRouter);
app.use(publicRouter);
app.use(mlRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
app.use(errorMiddleware);
app.disable("x-powered-by");

app.listen(port, () => {
  logger.info(`App starting in port: ${port}`);
});
