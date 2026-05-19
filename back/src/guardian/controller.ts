import { CreateGuardianSchema } from "@/guardian/schemas/createGuardian.schema";
import { validateSchema } from "@/utils/validateSchema";
import { createResponse } from "@/utils/apiResponse";
import * as service from "@/guardian/service";
import { Request, Response } from "express";

export const createGuardian = async (req: Request, res: Response) => {
  const schema = validateSchema(CreateGuardianSchema, req.body);

  await service.createGuardian(schema);

  return res.status(201).json(
    createResponse({
      message: {
        title: "Guardian created successfully",
        detail: "The guardian has been created",
      },
    })
  );
};
