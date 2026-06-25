import { logger } from "@/config/logger.config";
import { env } from "@/config/env.config";
import app from "@/app";

app.listen(env.PORT, () => {
  logger.info(`[APP] Server is running on port ${env.PORT}`);
});
