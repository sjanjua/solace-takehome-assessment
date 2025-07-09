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

export const AllSpecialties = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
] as const

export type Specialty = typeof AllSpecialties[number]