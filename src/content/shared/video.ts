import { InferType, object, string } from 'yup'

/**
 * Schema for the "Video" (`video`) content type.
 */
export const videoSchema = object({
  title: string().required(),
  videoUrl: string().required(),
})

export type Video = InferType<typeof videoSchema>
