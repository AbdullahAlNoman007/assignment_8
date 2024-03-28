import { z } from "zod";
import { bloodGroups } from "./user.const";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        bloodType: z.enum(bloodGroups),
        location: z.string(),
        age: z.number().int().positive(),
        bio: z.string(),
        lastDonationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Assuming date format YYYY-MM-DD
    })
})

export const validationSchema = {
    userValidationSchema
}