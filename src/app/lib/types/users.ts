import { z } from 'zod'


export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least 1 characters long.' })
    .trim(),
  first_name: z
    .string()
    .min(1, { message: 'First name must be at least 1 characters long.' })
    .trim(),
  family_name: z
    .string()
    .min(1, { message: 'Family name must be at least 1 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(6, { message: 'Be at least 6 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});


export type SignUpFormState =
  | {
      errors?: {
        name?: string[]
        first_name?: string[]
        family_name?: string[]
        email?: string[]
        password?: string[]
      }
    }
  | undefined;


export const LoginFormSchema = z.object({
  email: z.string().email({ message: '有効なパスワードを入力してください。' }).trim(),
  password: z
    .string()
    .min(6, { message: '6文字以上入力してください。' })
    .trim(),
});


export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined;


export type User = {
  id: number;
  name: string;
  family_name: string;
  first_name: string;
  email: string;
  update_timestamp: string | Date | null
  create_timestamp: string | Date | null;
} | null;
