import { z } from 'zod'

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required.')
        .email('Enter a valid email address.'),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .max(100, 'Password cannot exceed 100 characters.'),

    firstName: z
        .string()
        .max(100, 'First name cannot exceed 100 characters.'),

    lastName: z
        .string()
        .max(100, 'Last name cannot exceed 100 characters.'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>