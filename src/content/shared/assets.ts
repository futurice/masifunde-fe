import { InferType, object, string } from 'yup'

/**
 * Schema for the file information of a Contentful asset.
 * Only the fields required by this website are defined here.
 *
 * See the "Assets" section in:
 * https://www.contentful.com/developers/docs/references/content-delivery-api/
 */
export const fileSchema = object({
  contentType: string().required(),
  url: string().required(),
})

/**
 * Schema for a Contentful asset.
 * Only the fields required by this website are defined here.
 *
 * See the "Assets" section in:
 * https://www.contentful.com/developers/docs/references/content-delivery-api/
 */
export const assetSchema = object({
  title: string().required(),
  file: fileSchema.required(),
})

export type File = InferType<typeof fileSchema>
export type Asset = InferType<typeof assetSchema>
