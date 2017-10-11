import { createClient } from 'contentful'

const SPACE_ID = '6jocdllnp50q'
const ACCESS_TOKEN = '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed'

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
})

function fetchEntriesForContentType(contentType) {
  return client.getEntries({
    content_type: contentType,
  })
    .then(response => response.items)
    .catch((error) => {
      console.log(`\nError occurred while fetching Entries for ${contentType.name}:`)
      console.error(error)
    })
}

/** **************************************
 * API calls
 * - fetchIndividualPortraits
 * - fetchPost
 * - fetchTeamMembers
 * - fetchOutro
 * - fetchSuccessStories
 * - fetchSectionIntroduction
 * - fetchOpenPositions
**************************************** */
export function fetchIndividualPortraits() {
  const portraitsArray = []

  return fetchEntriesForContentType('individualPortraits')
    .then((individualPortraits) => {
      individualPortraits.forEach((portrait) => {
        portraitsArray.push({
          name: portrait.fields.name,
          profileImage: portrait.fields.profileImage,
          programName: portrait.fields.programName,
          description: portrait.fields.description,
        })
      })
      return portraitsArray
    })
}

export function fetchPost() {
  const postsArray = []
  return fetchEntriesForContentType('post')
    .then((posts) => {
      posts.forEach((post) => {
        postsArray.push({
          title: post.fields.title,
          content: post.fields.content,
          author: post.fields.author,
          hideAuthor: post.fields.hideAuthor,
          published: post.fields.published,
          type: post.fields.type,
        })
      })
      return postsArray
    })
}

export function fetchTeamMembers() {
  const teamMembersArray = []

  return fetchEntriesForContentType('teamMembers')
    .then((individualPortraits) => {
      individualPortraits.forEach((teamMember) => {
        teamMembersArray.push({
          name: teamMember.fields.name,
          responsibilityArea: teamMember.fields.responsibilityArea,
          profileImage: teamMember.fields.profileImage,
          email: teamMember.fields.email,
          social: teamMember.fields.social,
          type: teamMember.fields.type,
        })
      })
      return teamMembersArray
    })
}

export function fetchSuccessStories() {
  const successStoriesArray = []

  return fetchEntriesForContentType('successStories')
    .then((successStories) => {
      successStories.forEach((successStory) => {
        successStoriesArray.push({
          title: successStory.fields.title,
          description: successStory.fields.description,
          image: successStory.fields.image,
        })
      })
      return successStoriesArray
    })
}

export function fetchOpenPositions() {
  const openPositionsArray = []

  return fetchEntriesForContentType('openPositions')
    .then((openPositions) => {
      openPositions.forEach((openPosition) => {
        openPositionsArray.push({
          title: openPosition.fields.title,
          description: openPosition.fields.description,
          location: openPosition.fields.location,
          areOfWork: openPosition.fields.areOfWork,
        })
      })
      return openPositionsArray
    })
}

export function fetchAbout() {
  const resultArray = []

  return fetchEntriesForContentType('about')
    .then((aboutElements) => {
      aboutElements.forEach((element) => {
        resultArray.push({
          title: element.fields.title,
          subtitle: element.fields.subtitle,
          paragraphOneTitle: element.fields.paragraphOneTitle,
          paragraphOneText: element.fields.paragraphOneText,
          paragraphTwoTitle: element.fields.paragraphTwoTitle,
          paragraphTwoText: element.fields.paragraphTwoText,
          partnersImage: element.fields.partnersImage,
        })
      })
      return resultArray
    })
}

export function fetchWieSieHelfen() {
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
