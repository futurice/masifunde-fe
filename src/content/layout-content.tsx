import { InferType, object, string } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'

// Schema
// ======

/**
 * Schema for the "Header" (`header`) content type.
 */
export const headerContentSchema = object({
  whatWeDoText: string().required(),
  whoWeAreText: string().required(),
  howToSupportText: string().required(),
  donateText: string().required(),
})

/**
 * Schema for the "Footer" (`footer`) content type.
 */
export const footerContentSchema = object({
  whatWeDoText: string().required(),
  approachSaText: string().required(),
  approachDeText: string().required(),
  impactText: string().required(),
  whoWeAreText: string().required(),
  teamSaText: string().required(),
  teamDeText: string().required(),
  howToSupportText: string().required(),
  donateText: string().required(),
  becomeSponsorText: string().required(),
  becomeVolunteerText: string().required(),
  becomePartnerText: string().required(),
  contactText: string().required(),
  blogText: string().required(),
  documentsText: string().required(),
  podcastText: string().required(),
  copyrightText: string().required(),
  masifundeYouTubeUrl: string().required(),
  masifundeFacebookUrl: string().required(),
  masifundeInstagramUrl: string().required(),
  ibanText: string().required(),
  bicText: string().required(),
  impressumText: string().required(),
  datenschutzText: string().required(),
})

// Types
// =====

export type HeaderContent = InferType<typeof headerContentSchema>
export type FooterContent = InferType<typeof footerContentSchema>

// Functions
// =========

export function getHeaderContent(locale: string): Promise<HeaderContent> {
  return getSingletonEntryContent({
    content_type: 'header',
    schema: headerContentSchema,
    locale,
  })
}

export function getFooterContent(locale: string): Promise<FooterContent> {
  return getSingletonEntryContent({
    content_type: 'footer',
    schema: footerContentSchema,
    locale,
  })
}
