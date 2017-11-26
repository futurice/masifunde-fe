/* eslint-disable import/prefer-default-export */
import { fetchMemoizedSingleEntry } from './contentfulService'
import { unwrapImage } from './common'

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
