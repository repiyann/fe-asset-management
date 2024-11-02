import { z } from 'zod'

export const locationSchema = z.object({
  name: z.string().min(8).max(50),
  address: z.string().min(8).max(255),
})

export const masterDataSchema = z.object({
  name: z.string().min(8).max(50),
})
