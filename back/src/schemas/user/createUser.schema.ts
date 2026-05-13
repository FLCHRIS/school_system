import { PersonalInfoBaseSchema } from "@/schemas/base/personalInfoBase.schema";
import { ContactInfoBaseSchema } from "@/schemas/base/contactInfoBase.schema";
import { z } from "zod";

export const CreateUserSchema = z.object({
  personalInfo: PersonalInfoBaseSchema,
  contactInfo: ContactInfoBaseSchema,
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
