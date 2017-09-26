import {
  fetchIndividualPortraits,
  fetchSuccessStories,
  fetchOpenPositions,
  fetchTeamMembers,
  fetchPost,
  fetchAbout,
} from '../api/contentful'


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


/*******************************************
 * ABOUT FETCHERS
 *******************************************/

export async function getAboutFields() {
  var result = {}
  const aboutElements = await fetchAbout()
  aboutElements.map((element) => {
    result["title"] = element.title
    result["subtitle"] = element.subtitle
    result["paragraphOneTitle"] = element.paragraphOneTitle
    result["paragraphOneText"] = element.paragraphOneText
    result["paragraphTwoTitle"] = element.paragraphTwoTitle
    result["paragraphTwoText"] = element.paragraphTwoText
    if (element.partnersImage !== undefined) {
      result["partnersImageUrl"] = "https:" + element.partnersImage.fields.file.url
      result["partnersImageWidth"] = element.partnersImage.fields.file.details.image.width
      result["partnersImageHeight"] = element.partnersImage.fields.file.details.image.height
      result["partnersImageContentType"] = element.partnersImage.fields.file.contentType
    }
  })
  return result
}