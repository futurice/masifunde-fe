import {
  fetchIndividualPortraits,
  fetchSuccessStories,
  fetchSectionIntroduction,
  fetchOpenPositions,
  fetchTeamMembers,
  fetchOutro,
  fetchPost,
} from '../api/contentful'

async function getWasWirMachenSectionIntro() {
  var result ={}
  const introItems = await fetchSectionIntroduction()
  introItems.filter((item) => {item.location === 'Was wir machen'})
    .map((item) => {
      result['title'] = item.title
      result['longDescription'] = item.longDescription
      if(item.background !== undefined) {
        result['imageUrl'] = item.background.fields.file.url
        result['imageWidth'] = item.background.fields.file.details.image.width
        result['imageHeight'] = item.background.fields.file.details.image.height
        result['imageContentType'] = item.background.fields.file.contentType
      } else {
        result['imageUrl'] = ''
      }
    })

  return result
}