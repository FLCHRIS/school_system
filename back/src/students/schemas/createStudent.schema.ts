import { CreateGuardianSchema } from "@/guardian/schemas/createGuardian.schema";
import { AddressBaseSchema } from "@/schemas/base/addressBase.schema";
import { CreateUserSchema } from "@/schemas/user/createUser.schema";
import { z } from "zod";

const CreateStudentBaseSchema = z.object({
  user: CreateUserSchema,
  address: AddressBaseSchema,
});

const StudentWithExistingGuardianSchema = CreateStudentBaseSchema.extend({
  guardianId: z.coerce
    .number({
      error: "El tutor es obligatorio",
    })
    .min(1, {
      error: "Debes seleccionar un tutor",
    }),
}).strict();

export const StudentWithNewGuardianSchema = CreateStudentBaseSchema.extend({
  guardian: CreateGuardianSchema,
}).strict();

export const CreateStudentSchema = z.union([
  StudentWithExistingGuardianSchema,
  StudentWithNewGuardianSchema,
]);

export type StudentWithExistingGuardianSchemaType = z.infer<
  typeof StudentWithExistingGuardianSchema
>;

export type StudentWithNewGuardianSchemaType = z.infer<
  typeof StudentWithNewGuardianSchema
>;

export type CreateStudentSchemaType = z.infer<typeof CreateStudentSchema>;
