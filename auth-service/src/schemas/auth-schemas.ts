import {z} from 'zod'

export const registrationSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username can't exceed 30 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must be alphanumeric and can include underscores." }),
    
    email: z.string()
        .email({ message: "Invalid email format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(255, { message: "Email can't exceed 255 characters." }),
    
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })  
        .regex(/^\S*$/, { message: "Password cannot contain spaces." }) 
        .max(128, { message: "Password can't exceed 128 characters." })
})

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format." }).optional(),
    
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username can't exceed 30 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must be alphanumeric and can include underscores." })
        .optional(),
    
    password: z.string()
        .min(4, { message: "Password must be at least 4 characters long." })
})
