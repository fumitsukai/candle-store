import { LargeNumberLike } from "crypto";
import { StringValidation, z } from "zod";

export type LoginFormState =
  | {
      firstName?: string[];
      lastName?: string[];
      email?: string[];
      password?: string[];
      message?: string;
    }
  | undefined;

export type ProductProps = {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  created_at: string;
  stock: number;
  category: string;
  tags: string[];
  pictures: string[];
  qty: number;
  category_id?: number;
};

export type CartProps = {
  id: string;
  user_id: string;
  product_id: number;
  quantity: number;
  price: number;
};

export type OrderProps = {
  id: string;
  created_at: string;
  products: JSON;
  total: number;
  user_id: string;
  qty: number;
  quantity: number;
  status: string;
  order_items: OrderItem[];
};

export type OrderItem = {
  order_item_id: number;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  products: ProductProps;
};

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

export const editProductSchema = createProductSchema.extend({
  thumbnail: imageSchema.optional(),
});

const ukPostcodeRegex =
  /^(GIR\s?0AA|(?:[A-PR-UWYZ][0-9]{1,2}|(?:[A-PR-UWYZ][A-HK-Y][0-9]{1,2})|(?:[A-PR-UWYZ][0-9][A-HJKSTUW])|(?:[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]?))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

const nonEmptyString = z
  .string()
  .trim()
  .min(1, { message: "Must be at least 1 character long" });

// UK postcode validator using the regex above
const ukPostcodeValidator = z
  .string()
  .trim()
  .min(1, { message: "Postcode is required" })
  .regex(ukPostcodeRegex, { message: "Invalid UK postcode format" });

export const changeAddressSchema = z.object({
  address_line_1: nonEmptyString,
  address_line_2: nonEmptyString.optional(),
  city: nonEmptyString,
  country: nonEmptyString,
  postcode: ukPostcodeValidator,
});

export type AddressFormData =
  | {
      address_line_1?: string;
      address_line_2?: string;
      city?: string;
      country?: string;
      postcode?: string;
      message?: string;
    }
  | undefined;
