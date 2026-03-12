import { logger } from "@/config/logger";
import { env } from "@/config/env";
import app from "@/app";

app.listen(env.PORT, () => {
  logger.info(`Server is running on port ${env.PORT}`);
});
