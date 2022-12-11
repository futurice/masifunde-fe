import { InferType, object, string } from 'yup'
import { assetSchema } from './assets'

/**
 * Schema for the "Regional Group" (`regionalGroup`) content type.
 */
export const regionalGroupSchema = object({
  name: string().required(),
  contactPerson: string(),
  email: string(),
})

/**
 * Schema for the "Team Member" (`teamMembers`) content type.
 */
export const teamMemberSchema = object({
  name: string().required(),
  profileImage: assetSchema.required(),
  responsibilityArea: string().optional().default(undefined),
  email: string(),
  region: regionalGroupSchema.optional().default(undefined),
})

/**
 * Schema for a team member with full contact info.
 */
export const contactPersonSchema = teamMemberSchema.concat(
  object({
    email: string().required(),
  })
)

export type TeamMember = InferType<typeof teamMemberSchema>
export type ContactPerson = InferType<typeof contactPersonSchema>
