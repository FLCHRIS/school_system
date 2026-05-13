import { AddressBaseSchema } from "@/schemas/base/addressBase.schema";
import { CreateUserSchema } from "@/schemas/user/createUser.schema";
import { z } from "zod";

export const CreateGuardianSchema = z.object({
  user: CreateUserSchema,
  address: AddressBaseSchema,
});

export type CreateGuardianSchemaType = z.infer<typeof CreateGuardianSchema>;
