import {
  fetchIndividualPortraits,
  fetchSuccessStories,
  fetchSectionIntroduction,
  fetchOpenPositions,
  fetchTeamMembers,
  fetchOutro,
  fetchPost,
} from '../api/contentful'

/*******************************************
 * INTRODUCTION SECTION FETCHERS
 *******************************************/
async function getIntro(type) {
  var result = {}
  const introItems = await fetchSectionIntroduction()
  introItems.filter((item) => {
    return item.location === type
  })
  .map((item) => {
    result["title"] = item.title
    result["longDescription"] = item.longDescription
    if(item.background !== undefined) {
      result["imageUrl"] = item.background.fields.file.url
      result["imageWidth"] = item.background.fields.file.details.image.width
      result["imageHeight"] = item.background.fields.file.details.image.height
      result["imageContentType"] = item.background.fields.file.contentType
    } else {
      result["imageUrl"] = ""
    }
  })
  return result
}

export async function getWasWirMachenIntro() {
  return getIntro('WasWirMachen')
}

export async function getWerWirSindIntro() {
  return getIntro('Wer wir sind')
}

export async function getWieSieHelfenIntro() {
  return getIntro('Wie Sie helfen')
}


/*******************************************
 * POST FETCHERS
 *******************************************/
async function getPost(type) {
  var result = {}
  const postItems = await fetchPost()
  postItems.filter((item) => {
    return item.type === type })
  .map((item) => {
    result["title"] = item.title
    result["content"] = item.content
    result["hideAuthor"] = item.hideAuthor
    result["published"] = item.published
    if (item.author !== undefined) {
      result["authorName"] = item.author.fields.name
      if (item.author.fields.responsibilityArea !== undefined) {
        result["authorResponsibilityArea"] = item.author.fields.responsibilityArea
      }
      if (item.author.fields.email !== undefined) {
        result["authorEmail"] = item.author.fields.email
      }
      if (item.author.fields.social !== undefined) {
        result["authorSocial"] = item.author.fields.social
      }
      if (item.author.fields.social !== undefined) {
        result["authorSocial"] = item.author.fields.social
      }
    }
    if (item.image !== undefined) {
      result["imageUrl"] = item.image.fields.file.url
      result["imageWidth"] = item.image.fields.file.details.image.width
      result["imageHeight"] = item.image.fields.file.details.image.height
      result["imageContentType"] = item.image.fields.file.contentType
    }
  })
  return result
}

export async function getSozialdienstPost() {
  return getPost('sozialdienst')
}

export async function getSchuleUndAusbildungPost() {
  return getPost('schuleausbildung')
}

export async function getFreizeitangebotePost() {
  return getPost('freizeitangebote')
}

export async function getLifeSkillsTrainingPost() {
  return getPost('lifeskills')
}
