# Masifunde

Frontend for the Masifunde website. https://masifunde.netlify.com

## Installing / Getting started

```shell
npm install
npm run dev
```

This will run nodemon with `server.js` which will run next.js development environment on port
`3000`.

## Developing

### Built With

[Next.js](https://github.com/zeit/next.js/), [React](https://reactjs.org/),
[Styled-components](https://www.styled-components.com/),
[Bootstrap 4](https://getbootstrap.com),
[Contentful](https://www.contentful.com/),
[Fundraisingbox](https://www.fundraisingbox.com/).

### Prerequisites

Node 8 is required with NPM.

### Building

To generate:

```shell
npm run build-static
```

It will run next.js `next build && next export` commands which will generate static files in the
`out` folder. It will ONLY export and statically generate routes which are defined in `next.config.js` file.

### Deploying / Publishing

The site is hosted on [Netlify](https://www.netlify.com/), which requires static files.
Netlify will automatically run `npm run build-static` whenever anything is pushed to the `master` branch since it is connected to this GitHub repository. After that the changes should be reachable on https://masifunde.netlify.com.

When creating a Pull Request (PR), to the branches `master` or `release-1.0`, Netlify will build and publish the merge result as a preview under `deploy-preview-[preview-number]--masifunde.netlify.com`. Netlify can be configured to build deploy previews for other branches as well.

## Configuration

* Contentful credentials are hard coded.
* Crawler instructions are defined in `robots.txt` and are always exported to `https://masifunde.netlify.com/robots.txt`.
* Routes are defined in `routes.js` using
  [next-routes](https://www.npmjs.com/package/next-routes).

## Tests

No tests for now.

## Style guide

Project uses [ESLint AirBnb style guide](https://github.com/airbnb/javascript) with some tweaks (like no semicolons). The `precommit` git hook will
automatically run ESLint to check if the code complies with the rules. If it fails then it will not
push to the repo.

### Contentful model naming convention
Meta data:
* metaTitle - Title of the web page shown in the tab of the browser
* metaDescription - SEO (150 chars)

Hero (hero image not through Contentful):
* heroTitle - Text on top of the hero image

Page intro:
* introTitle - The main header on the page (usually the h1)
* introMarkdown - The intro text to the page
* introImage - The intro image to the page

Banner:
* bannerTitle
* bannerButtonText

Page section:
For each section of the page, we prefix the fields with "section<number>":
* section1Title
* section1Markdown
* section1Image
* section1List
* section1ReferenceList


* section2Title
* section2Markdown
* section2Image
* section2List
* section2ReferenceList

## Api Reference

The project uses [Contentful](https://www.contentful.com/) JavaScript package. To understand better
the API structure you should login into Contentful and have a look into `Content models` to see how
they are structured. The credentials can be found in the Futurice password safe.
