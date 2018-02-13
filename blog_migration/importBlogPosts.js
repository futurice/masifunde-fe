/* eslint-disable no-console, import/no-extraneous-dependencies */
const fs = require('fs')
const contentfulManagement = require('contentful-management')
const slug = require('slug')

const env = require('../env')

function loadPostsFromExport() {
  const filename = `${__dirname}/blog_export_with_contentful_image_urls.json`
  const json = fs.readFileSync(filename, 'utf8')
  return JSON.parse(json)
}

function preparePostContent(postBodyText) {
  return postBodyText
    // Expand single-endline paragraph breaks to blank lines
    .replace(/[\r\n]+/g, '\n\n')
    // Convert <b> and <i> to Markdown
    .replace(/<\/?i>/g, '_')
    .replace(/<\/?b>/g, '__')
    // Replace <img> tags with Mardown ![...](...) syntax and put them
    // into their own paragraph. If something is before the <img> (e.g.
    // an opening <b> tag, as seen in some posts), move to the start
    // of the next paragraph.
    .replace(/^(.*?)<img src="(\S+)".*?\/>\s*/gm, '![]($2)\n\n$1')
    // The post body contains some weird non-standard <link> tags that
    // look like this:
    //
    // <link https://example.com/path/to/somewhere>A document</link>
    // <link alice@example.com - mail>alice[at]example.com</link>
    // <link //domain/path/to/file.pdf>A document</link>
    // <link alice@example.com - mail>alice[at]example.com</link>
    //
    // The following line converts these to the [...](...) Markdown syntax.
    //
    // Many posts also contain links to internal pages of the old site,
    // referring to them by their internal page ID like this:
    //
    // <link 57 - internal link>...</link>
    //
    // Most of these we don't have any equivalent for, so we map them
    // to the (non-existent) /blog/internal/:id for now...
    .replace(/<link (\d+) .*?>(.*?)<\/link>/g, '[$2](/blog/internal/$1)')
    .replace(/<link (\S+) - mail.*?>(.*?)<\/link>/g, '[$2](mailto:$1)')
    .replace(/<link (\S+?)>(.*?)<\/link>/g, '[$2]($1)')
    .replace(/<link (\S+).*?>(.*?)<\/link>/g, '[$2]($1)')
    // Some posts' content starts with blank lines that we don't want to keep.
    .trim()
}

function createAssetLink(assetUrl) {
  // The asset URLs look like this:
  // //images.contentful.com/6jocdllnp50q/4C5fiodkVWCCaka8cUCqUy/...
  // The second path segment is the asset ID.
  const assetId = assetUrl.split('/')[4]

  return {
    sys: {
      type: 'Link',
      linkType: 'Asset',
      id: assetId,
    },
  }
}

async function importBlogPost(post, space) {
  const fields = {
    title: { de: post.title },
    slug: { de: slug(post.title, { lower: true }) },
    metaDescription: { de: post.teaser },
    teaserImage: { en: createAssetLink(post.teaserImage) },
    date: { en: new Date(post.datetime * 1000).toISOString() },
    content: { de: preparePostContent(post.bodytext) },
  }

  const id = `imported-blog-post-${post.uid}`
  let entry = await space.getEntry(id).catch(() => null)

  if (entry) {
    Object.assign(entry.fields, fields)
    entry = await entry.update()
  } else {
    entry = await space.createEntryWithId('blogPost', id, { fields })
  }

  await entry.publish()
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
  const client = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  })
  const space = await client.getSpace(env.CONTENTFUL_SPACE_ID)
  const posts = loadPostsFromExport()

  // To not hit the Contentful API rate limit, we need to import the
  // posts one by one with some delay between requests.

  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const post of posts) {
    console.log(`Importing post ${post.uid}…`)
    await importBlogPost(post, space)
    await delay(50)
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */

  console.log('Done!')
}

main().catch(err => console.error(err.stack))
