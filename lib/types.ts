import { z } from "zod";

export type FormState =
  | {
      firstName?: string[];
      lastName?: string[];
      email?: string[];
      password?: string[];
      message?: string;
    }
  | undefined;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .trim(),
  lastName: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Contain at least one lowercase and one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Contain at least one digit" })
    .regex(/[*a-zA-Z0-9]/, {
      message: "Contain at least one special character",
    })
    .trim(),
});

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character long" })
    .trim(),
  thumbnail: imageSchema.refine((file) => file.size > 0, "Required"),
  price: z.coerce.number().int().min(1),
  stock: z.coerce.number().min(1),
  category: z
    .string()
    .min(1, { message: "Must be more than 1 character long" })
    .trim(),
});
