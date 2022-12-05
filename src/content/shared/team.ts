import { object, string, InferType } from 'yup'
import { assetSchema } from './assets'

/**
 * Schema for the "Regional Group" (`regionalGroup`) content type,
 * but without the `contactPerson` field. Used as the schema for
 * `region` in {@link teamMemberSchema} to avoid a mutual dependency
 * between the schemas (which would break TypeScript type inference).
 */
const regionalGroupWithoutContactPersonSchema = object({
  name: string().required(),
  email: string(),
})

/**
 * Schema for the "Team Member" (`teamMembers`) content type.
 */
export const teamMemberSchema = object({
  name: string().required(),
  responsibilityArea: string().required(),
  profileImage: assetSchema,
  email: string(),
  // `region` is a reference to a "Regional Group" entry, which in
  // turn as a `contactPerson` field which is a reference to a
  // "Team Member". To avoid the recursion (which confuses TypeScript),
  // inline the definition of "Regional Group" but leave off
  // `contactPerson`.
  region: regionalGroupWithoutContactPersonSchema.default(undefined),
})

/**
 * Schema for a team member with full contact info.
 */
export const contactPersonSchema = teamMemberSchema.concat(
  object({
    email: string().required(),
  })
)

/**
 * Schema for the "Regional Group" (`regionalGroup`) content type.
 */
export const regionalGroupSchema =
  regionalGroupWithoutContactPersonSchema.concat(
    object({
      contactPerson: teamMemberSchema.default(undefined),
    })
  )

export type TeamMember = InferType<typeof teamMemberSchema>
export type ContactPerson = InferType<typeof contactPersonSchema>
