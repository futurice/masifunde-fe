import { createClient } from 'contentful';

const SPACE_ID = '6jocdllnp50q';
const ACCESS_TOKEN = '5c8090d12bc2bf8dc695353cc398cd5e48eb56c214325884284bfdbfef4ba5ed';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

export function getContentTypes() {
  return client.getContentTypes()
    .then((response) => {
      console.log(`${response.total} content types found`);
      return response.items;
    })
    .catch((error) => {
      console.log('\nError occurred while fetching Content Types:');
      console.error(error);
    });
}

export function getEntriesForContentType(contentType) {
  return client.getEntries({ content_type: contentType.sys.id })
    .then((response) => {
      console.log(`${response.total} entries found for content type ${contentType.name}`);
      return response.items;
    })
    .catch((error) => {
      console.log(`\nError occurred while fetching Entries for ${chalk.cyan(contentType.name)}:`);
      console.error(error);
    });
}
