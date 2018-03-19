import { fetchMemoizedSingleEntry, fetchSingleEntry } from './contentfulService'
import {
  unwrapCampaignPageBanner,
  unwrapFields,
  unwrapImage,
  unwrapPageUrl,
  unwrapPartners,
  unwrapTeamMember,
  unwrapTestimonials,
} from './common'
import { jpegQuality } from '../utils/constants'

export async function fetchDonatePage(locale) {
  const content = await fetchMemoizedSingleEntry('pageDonate', locale)
  return {
    ...content,
    section2ReferenceList: content.section2ReferenceList.map(unwrapFields),
    section3ReferenceList: content.section3ReferenceList.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

const unwrapSectionImage = image => unwrapImage(image, {
  w: 495,
  q: jpegQuality,
})

export async function fetchHowToSupportPage(locale) {
  const content = await fetchMemoizedSingleEntry('pageWieSieHelfen', locale)
  return {
    ...content,
    section1Image: unwrapSectionImage(content.section1Image),
    section2Image: unwrapSectionImage(content.section2Image),
    section3Image: unwrapSectionImage(content.section3Image),
    section4Image: unwrapSectionImage(content.section4Image),
    campaign: unwrapCampaignPageBanner(content.campaign),
  }
}

const unwrapVolunteerOpening = volunteerOpening => ({
  ...volunteerOpening.fields,
})

export async function fetchBecomeAVolunteerPage(locale) {
  const content = (await fetchMemoizedSingleEntry('pageAktivWerden', locale)) || {}
  return {
    ...content,
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),

    // Temporarily support old field ID's (section1Title etc.)
    deTestimonialsHeading: content.deTestimonialsHeading || content.section3Title,
    deTestimonials: unwrapTestimonials(content.deTestimonials || content.section1ReferenceList),
    deVolunteerOpeningsHeading: content.deVolunteerOpeningsHeading || content.section2Title,
    deVolunteerOpenings: (content.deVolunteerOpenings || content.volunteerOpenings)
      .map(unwrapVolunteerOpening),
    deVolunteerContactHeading: content.deVolunteerContactHeading || content.section1Title,
    deVolunteerContactText: content.deVolunteerContactText || content.section1Markdown,
    deVolunteerContact: unwrapTeamMember(content.deVolunteerContact || content.section1TeamMember),
    saVolunteerOpening1Heading: content.saVolunteerOpening1Heading || content.section4Title,
    saVolunteerOpening1Text: content.saVolunteerOpening1Text || content.section4Markdown,
    saVolunteerOpening1ContactHeading: content.saVolunteerOpening1ContactHeading ||
      content.section6Title,
    saVolunteerOpening1ContactText: content.saVolunteerOpening1ContactText
      || content.section6Markdown,
    saVolunteerOpening1Contact: unwrapTeamMember(content.saVolunteerOpening1Contact
      || content.section6TeamMember),
    saVolunteerOpening2Contact: unwrapTeamMember(content.saVolunteerOpening2Contact),
  }
}

export async function fetchBecomeAPartnerPage(locale) {
  const content = await fetchSingleEntry('pageBecomeAPartner', locale)
  return {
    ...content,
    partners: unwrapPartners(content.partners),
    teamMember: unwrapTeamMember(content.teamMember),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchBecomeASponsorPage(locale) {
  const content = await fetchMemoizedSingleEntry('pagePateWerden', locale)
  return {
    ...content,
    image: unwrapImage(content && content.image),
    section2ReferenceList: content && content.section2ReferenceList.map(unwrapFields),
    section3ReferenceList: content && content.section3ReferenceList.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
