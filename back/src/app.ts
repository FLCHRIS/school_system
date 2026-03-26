import { errorMiddleware } from "@/middlewares/error.middlewares";
import { logger } from "@/config/logger";
import { env } from "@/config/env";

import authRoter from "@/auth/router";

import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);
app.use(express.json());

app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/api/auth", authRoter);

app.use(errorMiddleware);

export default app;
