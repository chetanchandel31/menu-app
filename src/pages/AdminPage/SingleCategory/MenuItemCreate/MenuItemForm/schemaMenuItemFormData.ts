import { z } from "zod";

export const schemaMenuItemFormData = z.object({
  menuItemName: z
    .string()
    .min(3, { message: "Name should be of atleast 3 characters" }),
  price: z
    .number()
    .min(1, { message: "Price shouldn't be lower than 1" })
    .nullable(),
  description: z
    .string()
    .min(5, { message: "Description should be of atleast 8 characters" }),
});

export type TypeMenuItemFormData = z.infer<typeof schemaMenuItemFormData>;
