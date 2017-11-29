import { fetchMemoizedSingleEntry } from './contentfulService'

export async function fetchHeaderData(locale) {
  return fetchMemoizedSingleEntry('header', locale)
}

export async function fetchFooterData(locale) {
  return fetchMemoizedSingleEntry('footer', locale)
}

export const unwrapImage = image => ({
  url: image.fields.file.url,
  title: image.fields.title,
})

export const unwrapRegion = region => region.fields.name

export const unwrapPortrait = portrait => ({
  ...portrait,
  page1Image: unwrapImage(portrait.fields.page1Image),
  page2Image: unwrapImage(portrait.fields.page2Image),
  page3Image: unwrapImage(portrait.fields.page3Image),
})
