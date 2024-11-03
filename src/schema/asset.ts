import { z } from 'zod'

export const assetSchema = z.object({
  name: z.string().min(3).max(64),
  locationId: z.string().min(5).max(40),
  categoryId: z.string().min(3).max(40),
  fixedAssetId: z.string().min(3).max(40),
  description: z.string().min(10).max(255),
  acquisitionDate: z.date({
    required_error: 'Acquisition date is required.',
  }),
  acquisitionCost: z.number().positive(),
  nonDepreciation: z.boolean().or(
    z.object({
      method: z.string().max(20),
      usagePeriod: z.number().positive(),
      usageValuePerYear: z.number().positive(),
      depreciationId: z.string().min(3).max(40),
      accuDepreciationId: z.string().min(3).max(40),
    })
  ),
})
