import { logger } from "@/config/logger";
import { env } from "@/config/env";
import app from "@/app";

app.listen(env.PORT, () => {
  logger.info(`[APP] Server is running on port ${env.PORT}`);
});
