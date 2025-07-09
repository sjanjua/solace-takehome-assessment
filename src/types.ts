import { z } from 'zod/v4'

export const AdvocateSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    city: z.string(),
    degree: z.string(),
    specialties: z.string().array(),
    yearsOfExperience: z.number(),
    phoneNumber: z.string(),
    createdAt: z.string(),
})

export const AdvocatesSchema = z.array(AdvocateSchema)

export type Advocate = z.infer<typeof AdvocateSchema>
export type Advocates = z.infer<typeof AdvocatesSchema>