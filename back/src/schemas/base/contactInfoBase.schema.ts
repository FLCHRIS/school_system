import { z } from "zod";

export const ContactInfoBaseSchema = z.object({
  email: z.email({
    message: "El correo electrónico no es válido",
  }),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{10}$/.test(value), {
      message: "El número telefónico debe contener 10 dígitos",
    }),
});

export type ContactInfoBaseSchemaType = z.infer<typeof ContactInfoBaseSchema>;
