import { z } from "zod";

export const registrationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
})

export const loginSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string(),
})