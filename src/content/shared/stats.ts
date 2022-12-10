import { InferType, object, string } from 'yup'
import { assetSchema } from './assets'

/**
 * Schema for the "Stat" (`stat`) content type.
 */
export const statSchema = object({
  description: string().required(),
  number: string().default(''),
  textAbove: string().default(''),
  sourceMarkdown: string().default(''),
  icon: assetSchema.optional().default(undefined),
})

export type Stat = InferType<typeof statSchema>
