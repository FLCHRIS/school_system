import { AddressBaseSchema } from "@/schemas/base/addressBase.schema";
import { UpdateUserSchema } from "@/schemas/user/updateUser.schema";
import { z } from "zod";

export const UpdateGuardianSchema = z.object({
  user: UpdateUserSchema,
  address: AddressBaseSchema,
});

export type UpdateGuardianSchemaType = z.infer<typeof UpdateGuardianSchema>;
