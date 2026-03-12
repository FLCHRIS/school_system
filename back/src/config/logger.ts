import pino from "pino";
import { env } from "./env";

const isDev = env.NODE_ENV === "development";

export const logger = pino(
  {
    level: isDev ? "debug" : "info",
  },
  isDev
    ? pino.transport({
        target: "pino-pretty",
        options: { colorize: true },
      })
    : undefined
);
