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

export function fetchIndividualPortraits() {
  var portraitsArray = []

  return fetchEntriesForContentType("individualPortraits")
  .then((individualPortraits) => {
    individualPortraits.forEach((portrait) => {
      console.log("Portrait:", portrait)
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
