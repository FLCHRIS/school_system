import { z } from "zod";

export const AddressBaseSchema = z.object({
  street: z
    .string()
    .trim()
    .min(3, {
      error: "La calle debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "La calle no debe exceder 255 caracteres",
    }),
  neighborhood: z
    .string()
    .trim()
    .min(3, {
      error: "La colonia debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "La colonia no debe exceder 255 caracteres",
    }),
  city: z
    .string()
    .trim()
    .min(3, {
      error: "La ciudad debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "La ciudad no debe exceder 255 caracteres",
    }),
  state: z
    .string()
    .trim()
    .min(3, {
      error: "El estado debe tener al menos 3 caracteres",
    })
    .max(255, {
      error: "El estado no debe exceder 255 caracteres",
    }),
  zipCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, {
      error: "El código postal debe contener 5 dígitos",
    }),
  reference: z
    .string()
    .trim()
    .max(255, {
      error: "La referencia no debe exceder 255 caracteres",
    })
    .optional(),
});

export type AddressBaseSchemaType = z.infer<typeof AddressBaseSchema>;
