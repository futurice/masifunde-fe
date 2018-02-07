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
[Bootstrap 4 (beta)](https://getbootstrap.com), [React-Strap](https://reactstrap.github.io),
[Contentful](https://www.contentful.com/).

### Prerequisites

Node 8 is required with NPM.

### Building

To generate:

```shell
npm run build-static
```

It will run next.js `next build && next export` commands which will generate static files in folder
`out`. It will ONLY export routes which are defined in `next.config.js` file.

### Deploying / Publishing

[Netlify](https://www.netlify.com/) will automatically run `npm run build-static` whenever anything is pushed to the `master` branch since it is connected to this GitHub repository. After that the changes should be reachable on https://masifunde.netlify.com.

## Configuration

* Contentful credentials are hard coded.
* Robots are defined in `robots.txt` and all included always in export. IMPORTANT - at the moment it
  blocks all crawlers.
* Routes are defined in `routes.js` file with
  [next-routes](https://www.npmjs.com/package/next-routes) library. It has all the definitions and
  the mapping of the routes.

## Tests

No tests for now.

## Feature Flags

We have a [feature flags][feature-flags] mechanism for decoupling the release
of features from deployment. The currently existing flags can be seen in
`featureFlags.js`.

By default, all feature flags are enabled during development and disabled for
production. You can override this default by setting an environment variable
called `ENABLED_FEATURES`, like this:

```sh
# Enable exactly feature1 and feature2
ENABLED_FEATURES=feature1,feature2 npm run dev

# Enable all features (the default during development)
ENABLED_FEATURES=* npm run dev

# Disable all features (the default in production)
ENABLED_FEATURES= npm run dev
```

Remember that feature flags are always temporary. Once a feature behind a
flag goes to production, simply remove the flag altogether.

Occasionally, you might experience that the site doesn't update properly
after restarting the development server with a different `ENABLED_FEATURES`
setting. In that case, try removing the `.next` cache folder.

[feature-flags]: https://martinfowler.com/articles/feature-toggles.html

## Style guide

Project uses ESLint AirBnb style guide without semicolons. The `precommit` git hook will
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
they are structured. The credentials can be found in the password safe.

## Testing Fundraisingbox locally

Fundraisingbox only displays the form in the iframe if you load the iframe from a specified domain, e.g. masifunde.netlify.com. In order to test it locally you need to expose your localhost. You can use ngrok (https://ngrok.com/) for this. Install ngrok and run the command ```ngrok http 3000 --region eu```. You will then see the address to which ngrok exposes your localhost.

Log into Masifunde's Fundraisingbox (https://secure.fundraisingbox.com). In the top right hover "Einstellung" and click "Spendenformular". In the "Welches Formular wollen Sie bearbeiten" dropdown select the correct Fundraising form (as of writing this, that's "Development"). Paste your ngrok address into the field "Einbettungsadresse". Save. If you go to your ngrok address you should now be able to see the Fundraising form.
