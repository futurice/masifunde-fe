import { InferType, object, string } from 'yup'
import { assetSchema } from './assets'

/**
 * Schema for the "Individual Portrait" (`individualPortraits`) content type.
 */
export const individualPortraitSchema = object({
  name: string().required(),
  page1Image: assetSchema.required(),
  page1Heading: string().required(),
  page1Text: string().required(),
  page2Image: assetSchema.required(),
  page2Heading: string().required(),
  page2Text: string().required(),
  page3Image: assetSchema.required(),
  page3Heading: string().required(),
  page3Text: string().required(),
})

export type IndividualPortrait = InferType<typeof individualPortraitSchema>
