/* eslint-disable import/prefer-default-export */
import { fetchEntriesForContentType } from './contentfulService'

function fetchWieSieHelfen() {
  const resultArray = []

  return fetchEntriesForContentType('wieSieHelfen')
    .then((elements) => {
      elements.forEach((element) => {
        resultArray.push({
          title: element.fields.title,
          paragraphOneTitle: element.fields.paragraphOneTitle,
          paragraphOneText: element.fields.paragraphOneText,
          paragraphTwoTitle: element.fields.paragraphTwoTitle,
          paragraphTwoText: element.fields.paragraphTwoText,
          paragraphThreeTitle: element.fields.paragraphTwoTitle,
          paragraphThreeText: element.fields.paragraphTwoText,
          partnersImage: element.fields.partnersImage,
        })
      })
      return resultArray
    })
}

export async function fetchHowToSupportPage() {
  const result = {}
  const elements = await fetchWieSieHelfen()
  elements.forEach((element) => {
    result.title = element.title
    result.paragraphOneTitle = element.paragraphOneTitle
    result.paragraphOneText = element.paragraphOneText
    result.paragraphTwoTitle = element.paragraphTwoTitle
    result.paragraphTwoText = element.paragraphTwoText
    result.paragraphThreeTitle = element.paragraphThreeTitle
    result.paragraphThreeText = element.paragraphThreeText
    if (element.partnersImage !== undefined) {
      result.partnersImageUrl = `https:${element.partnersImage.fields.file.url}`
      result.partnersImageWidth = element.partnersImage.fields.file.details.image.width
      result.partnersImageHeight = element.partnersImage.fields.file.details.image.height
      result.partnersImageContentType = element.partnersImage.fields.file.contentType
    }
  })
  return result
}
