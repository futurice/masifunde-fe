# Masifunde

Frontend for the Masifunde website. https://masifunde.netlify.com

## Installing / Getting started

```shell
npm isntall
npm run dev
```

This will run nodemon with `server.js` which will run next.js development environment on port
`3000`.

## Developing

### Built With

[Next.js](https://github.com/zeit/next.js/), [React](https://reactjs.org/),
[Styled-components](https://www.styled-components.com/),
[Bootstrap 4 (beta)](https://getbootstrap.com), [React-Strap](https://reactstrap.github.io),
[Contentful](https://www.contentful.com/).

### Prerequisites

Node 8 is required with NPM.

### Building

The generate:

```shell
npm run build-static
```

It will run next.js `next build && next export` commands which will generate static files in folder
`out`. It will ONLY export routes which are defined in `next.config.js` file.

### Deploying / Publishing

[Netlify](https://www.netlify.com/) will automatically runs `npm run build-static
` command whenever anything is pushed to `master` branch since it is
connected to this github repository. After that the changes should be reachable on https://masifunde.netlify.com.

## Configuration

* Contentful credentials are hard coded.
* Robots are defined in `robots.txt` and all included always in export. IMPORTANT - at the moment it
  blocks all crawlers.
* Routes are defined in `routes.js` file with
  [next-routes](https://www.npmjs.com/package/next-routes) library. It has all the definitions and
  the mapping of the routes.

## Tests

No test for now.

## Style guide

Project uses EsLint Airbnb style guide without no semi columns. The `precommit` git hook will
automatically runs EsLint to check if the code complies with the rules if it fails then it will not
push to git branch.

### Contentful model naming convention
Meta data:
* metaTitle - Title of the web page shown in the tab of the browser
* metaDescription - SEO (150 chars)

Hero (hero image not through Contentful):
* heroTitle - Text on top of the hero image

Page intro:
* introHeading - The main header on the page (usually the h1)
* introMarkdown - The intro text to the page
* introImage - The intro image to the page

Banner:
* bannerTitle
* bannerButtonText

Page section:
For each section of the page, we prefix the fields with "section<number>":
* section2Title
* section2Markdown
* section2Image
* section2List
* section2ReferenceList

## Api Reference

The project uses [Contentful](https://www.contentful.com/) javascript package. To understand better
the API structure you should login into Contentful and have a look into `Content models` to see how
they are structured. The credentials can be found at https://password.futurice.com/.
