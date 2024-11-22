import { z } from "zod";

export const createProfileSchema = z.object({
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name can't exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces." })
        .trim(),
    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name can't exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces." })
        .trim(),
    bio: z.string()
        .max(500, { message: "Bio can't exceed 500 characters." })
        .trim()
        .optional(),
});

export const updateProfileSchema = z.object({
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters long." })
        .max(50, { message: "First name can't exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "First name can only contain letters and spaces." })
        .trim()
        .optional(),
    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters long." })
        .max(50, { message: "Last name can't exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, { message: "Last name can only contain letters and spaces." })
        .trim()
        .optional(),
    bio: z.string()
        .max(500, { message: "Bio can't exceed 500 characters." })
        .trim()
        .optional()
});
