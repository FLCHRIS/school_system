import { logger } from "@/config/logger";
import { env } from "@/config/env";

import PinoHttp from "pino-http";
import express from "express";
import cors from "cors";

const app = express();

app.use(PinoHttp({ logger, autoLogging: true }));
app.use(express.json());

app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

export default app;
