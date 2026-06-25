import { HttpError } from "@/errors/http.error";
import { logger } from "@/config/logger.config";
import { prisma } from "@/config/prisma.config";

export const validateEmailAvailable = async (email: string) => {
  const data = await prisma.contactInfo.findFirst({ where: { email } });

  if (data) {
    logger.warn(`[USER] Correo electrónico ya registrado - "${email}"`);

    throw new HttpError(
      409,
      "Correo ya registrado",
      "El correo electrónico ya se encuentra registrado"
    );
  }
};
