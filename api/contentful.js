import { createClient } from 'contentful';

const SPACE_ID = '6jocdllnp50q';
const ACCESS_TOKEN = '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function fetchEntriesForContentType (contentType) {
  return client.getEntries({
      content_type: contentType
    })
  .then((response) => response.items)
  .catch((error) => {
    console.log(chalk.red(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`))
    console.error(error)
  })
}

/****************************************
 * API calls
 * - fetchIndividualPortraits
 * - fetchPost
 * - fetchTeamMembers
 * - fetchOutro
 * - fetchSuccessStories
 * - fetchSectionIntroduction
 * - fetchOpenPositions
*****************************************/
export function fetchIndividualPortraits() {
  var portraitsArray = []

  return fetchEntriesForContentType("individualPortraits")
  .then((individualPortraits) => {
    individualPortraits.forEach((portrait) => {
      portraitsArray.push({
        "name":portrait.fields.name,
        "profileImage":portrait.fields.profileImage,
        "programName":portrait.fields.programName,
        "description":portrait.fields.description
      })
    })
    return portraitsArray
  })
}

export function fetchPost() {
  var postsArray = []
  return fetchEntriesForContentType("post")
  .then((posts) => {
    posts.forEach((post) => {
      postsArray.push({
        "title":post.fields.title,
        "content":post.fields.content,
        "author":post.fields.author,
        "hideAuthor":post.fields.hideAuthor,
        "published":post.fields.published,
        "type":post.fields.type
      })
    })
    return postsArray
  })
}

export function fetchTeamMembers() {
  var teamMembersArray = []

  return fetchEntriesForContentType("teamMembers")
  .then((individualPortraits) => {
    individualPortraits.forEach((teamMember) => {
      teamMembersArray.push({
        "name":teamMember.fields.name,
        "responsibilityArea":teamMember.fields.responsibilityArea,
        "profileImage":teamMember.fields.profileImage,
        "email":teamMember.fields.email,
        "social":teamMember.fields.social,
        "type":teamMember.fields.type,
      })
    })
    return teamMembersArray
  })
}

export function fetchOutro() {
  var outrosArray = []

  return fetchEntriesForContentType("outro")
  .then((outros) => {
    outros.forEach((outro) => {
      console.log("SuccessStory:", outro)
      outrosArray.push({
        "title":outro.fields.title,
        "description":outro.fields.description,
        "image":outro.fields.image,
      })
    })
    return outrosArray
  })
}

export function fetchSuccessStories() {
  var successStoriesArray = []

  return fetchEntriesForContentType("successStories")
  .then((successStories) => {
    successStories.forEach((successStory) => {
      successStoriesArray.push({
        "title":successStory.fields.title,
        "description":successStory.fields.description,
        "image":successStory.fields.image,
      })
    })
    return successStoriesArray
  })
}

export function fetchSectionIntroduction() {
  var sectionIntroArray = []

  return fetchEntriesForContentType("sectionIntroduction")
  .then((sectionIntroductions) => {
    sectionIntroductions.forEach((sectionIntro) => {
      sectionIntroArray.push({
        "title":sectionIntro.fields.title,
        "longDescription":sectionIntro.fields.longDescription,
        "background":sectionIntro.fields.background,
        "mediaContent":sectionIntro.fields.mediaContent,
        "location":sectionIntro.fields.location,
      })
    })
    return sectionIntroArray
  })
}

export function fetchOpenPositions() {
  var openPositionsArray = []

  return fetchEntriesForContentType("openPositions")
  .then((openPositions) => {
    openPositions.forEach((openPosition) => {
      openPositionsArray.push({
        "title":openPosition.fields.title,
        "description":openPosition.fields.description,
        "location":openPosition.fields.location,
        "areOfWork":openPosition.fields.areOfWork,
      })
    })
    return openPositionsArray
  })
}