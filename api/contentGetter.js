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
async function getAllPostsOf(type) {
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
  return getAllPostsOf('sozialdienst')
}

export async function getSchuleUndAusbildungPost() {
  return getAllPostsOf('schuleausbildung')
}

export async function getFreizeitangebotePost() {
  return getAllPostsOf('freizeitangebote')
}

export async function getLifeSkillsTrainingPost() {
  return getAllPostsOf('lifeskills')
}

export async function getAllBlogs() {
  return getAllPostsOf('blog')
}


/*******************************************
 * TEAM FETCHERS
 *******************************************/
async function getTeamMembers(type) {
  var result = {}
  const teamMembers = await fetchTeamMembers()
  teamMembers.filter((member) => {
    return member.type === type })
  .map((member) => {
    result["name"] = member.name
    result["responsibilityArea"] = member.responsibilityArea
    result["email"] = member.email
    result["social"] = member.social
    if (member.profileImage !== undefined) {
      result["profileImageUrl"] = member.profileImage.fields.file.url
      result["profileImageWidth"] = member.profileImage.fields.file.details.image.width
      result["profileImageHeight"] = member.profileImage.fields.file.details.image.height
      result["profileImageContentType"] = member.profileImage.fields.file.contentType
    }
  })
  return result
}

export async function getManagerTeamMembers() {
  return getTeamMembers('management')
}

export async function getVolunteerTeamMembers() {
  return getTeamMembers('volunteer')
}

export async function getEmployeeTeamMembers() {
  return getTeamMembers('employee')
}

export async function getOtherTeamMembers() {
  return getTeamMembers('other')
}

export async function getAuthorTeamMembers() {
  return getTeamMembers('author')
}
