/* eslint-disable import/prefer-default-export */
import { fetchMemoizedSingleEntry } from './contentfulService'
import { unwrapImage, unwrapRegionalGroups, unwrapTeamMember } from './common'

export async function fetchHowToSupportPage(locale) {
  const content = await fetchMemoizedSingleEntry('pageWieSieHelfen', locale)
  return {
    ...content,
    section1Image: unwrapImage(content.section1Image),
    section2Image: unwrapImage(content.section2Image),
    section3Image: unwrapImage(content.section3Image),
    section4Image: unwrapImage(content.section4Image),
  }
}

const unwrapVolunteerOpening = volunteerOpening => ({
  ...volunteerOpening.fields,
})

export async function fetchBecomeAVolunteerPage(locale) {
  const content = await fetchMemoizedSingleEntry('pageAktivWerden', locale)
  return {
    ...content,
    regionalGroups: unwrapRegionalGroups(content.regionalGroups),
    section1TeamMember: unwrapTeamMember(content.section1TeamMember),
    volunteerOpenings: content.volunteerOpenings.map(unwrapVolunteerOpening),
  }
}

export async function fetchBecomeASponsorPage(locale) {
  const content = await fetchMemoizedSingleEntry('pagePateWerden', locale)
  return {
    ...content,
    image: unwrapImage(content.image),
  }
}
