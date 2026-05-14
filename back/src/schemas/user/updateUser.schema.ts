import { PersonalInfoBaseSchema } from "@/schemas/base/personalInfoBase.schema";
import { ContactInfoBaseSchema } from "@/schemas/base/contactInfoBase.schema";
import { z } from "zod";

export const UpdateUserSchema = z.object({
  personalInfo: PersonalInfoBaseSchema,
  contactInfo: ContactInfoBaseSchema,
});

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
