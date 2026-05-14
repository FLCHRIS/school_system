import { AddressBaseSchema } from "@/schemas/base/addressBase.schema";
import { UpdateUserSchema } from "@/schemas/user/updateUser.schema";
import { z } from "zod";

export const UpdateStudentSchema = z.object({
  guardianId: z.coerce.number(),
  address: AddressBaseSchema,
  user: UpdateUserSchema,
});

export type UpdateStudentSchemaType = z.infer<typeof UpdateStudentSchema>;
