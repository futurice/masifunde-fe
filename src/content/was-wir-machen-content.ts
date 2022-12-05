import { array, object, string, InferType } from 'yup'
import { getSingletonEntryContent } from '../utils/contentful'
import { assetSchema } from './shared/assets'
import { statSchema } from './shared/stats'
import { contactPersonSchema } from './shared/team'
import { individualPortraitSchema } from './shared/portrait'

// Schemas
// =======

/**
 * Schema for the "Project" (`project`) content type.
 */
export const projectSchema = object({
  name: string().required(),
  description: string().required(),
  image: assetSchema,
})

/**
 * Schema for the "Page: Was wir machen" (`pageWasWirMachen`) content type.
 * (English: "What we do")
 */
export const whatWeDoContentSchema = object({
  // Metadata
  metaTitle: string().default(''),
  metaDescription: string().default(''),
  // Hero
  heroTitle: string().required(),
  // Intro
  introHeading0: string().required(),
  introText: string().required(),
  // Video
  videoUrl: string().required(),
  // Country Projects
  introHeading: string().required(),
  projectsTitleSa: string().required(),
  projectsDescriptionSa: string().required(),
  projectsSa: array(projectSchema).default([]),
  projectsButtonSa: string().required(),
  projectsTitleDe: string().required(),
  projectsDescriptionDe: string().required(),
  projectsDe: array(projectSchema).default([]),
  projectsButtonDe: string().required(),
  // Tagline
  centerHeading: string().required(),
  // Impact Stats
  statsHeading: string().required(),
  stats: array(statSchema).default([]),
  statsButton: string().required(),
  // Outro
  outroHeading: string().required(),
  outroText: string().required(),
  outroTextColumn2: string().required(),
  // Banner
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Ansatz DE" (`pageApproachDE`) content type.
 * (English: "Approach DE")
 */
export const approachDEContentSchema = object({
  // Metadata
  metaTitle: string().default(''),
  metaDescription: string().default(''),
  // Tagline
  title: string().required(),
  // Intro
  introHeading: string().required(),
  introText: string().required(),
  projects: array(projectSchema).default([]),
  // Image
  image1: assetSchema.required(),
  // Stats
  statsTitle: string().required(),
  stats: array(statSchema).default([]),
  // Contact Info
  section1Title: string().required(),
  section1Markdown: string().required(),
  teamMember: contactPersonSchema.required(),
  // Banner
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Ansatz SA" (`pageApproachSA`) content type.
 * (English: "Approach SA")
 */
export const approachSAContentSchema = object({
  // Metadata
  metaTitle: string().default(''),
  metaDescription: string().default(''),
  // Tagline
  title: string().required(),
  // Intro
  introTitle: string().required(),
  introMarkdown: string().required(),
  projects: array(projectSchema).default([]),
  // Video
  videoUrl: string().required(),
  // Outro
  outroTitle: string().required(),
  outroMarkdown1: string().required(),
  outroMarkdown2: string().required(),
  // Banner
  bannerTitle: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

/**
 * Schema for the "Page: Effekte" (`pageImpact`) content type.
 * (English: "Impact")
 */
const impactContentSchema = object({
  // Metadata
  metaTitle: string().default(''),
  metaDescription: string().default(''),
  // Tagline
  title: string().required(),
  // Video
  videoUrl: string(),
  // Stats
  stats1Title: string().required(),
  stats1: array(statSchema).default([]),
  stats2Title: string(),
  stats2: array(statSchema).default([]),
  // Portraits
  portrait1: individualPortraitSchema.required(),
  portrait2: individualPortraitSchema.required(),
  // Outro
  outroTitle: string().required(),
  outroMarkdown: string().required(),
  outroTextColumn2: string().required(),
  // Banner
  bannerText: string().required(),
  bannerButtonText: string().required(),
  bannerButtonUrl: string().required(),
})

// Types
// =====

export type Project = InferType<typeof projectSchema>
export type WhatWeDoContent = InferType<typeof whatWeDoContentSchema>
export type ApproachDEContent = InferType<typeof approachDEContentSchema>
export type ApproachSAContent = InferType<typeof approachSAContentSchema>
export type ImpactContent = InferType<typeof impactContentSchema>

// Functions
// =========

export function getWhatWeDoContent(locale: string) {
  return getSingletonEntryContent<WhatWeDoContent>({
    content_type: 'pageWasWirMachen',
    schema: whatWeDoContentSchema,
    locale,
  })
}

export function getApproachDEContent(locale: string) {
  return getSingletonEntryContent<ApproachDEContent>({
    content_type: 'pageApproachDE',
    schema: approachDEContentSchema,
    locale,
  })
}

export function getApproachSAContent(locale: string) {
  return getSingletonEntryContent<ApproachSAContent>({
    content_type: 'pageApproachSA',
    schema: approachSAContentSchema,
    locale,
  })
}

export function getImpactContent(locale: string) {
  return getSingletonEntryContent<ImpactContent>({
    content_type: 'pageImpact',
    schema: impactContentSchema,
    locale,
  })
}
