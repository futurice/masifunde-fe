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

When creating a Pull Request (PR) to `master`, Netlify will build and publish the merge result as a preview under `deploy-preview-[preview-number]--masifunde.netlify.com`.

__Note that most Netlify build and deploy settings are defined in `netlify.toml`
in this repository__, which override those seen in the Netlify dashboard! See
the [Netlify "Deploy Contexts" documentation][deploy-contexts]. (Hopefully in
the future, Netlify will hide the settings that we define in `netlify.toml`
to reduce confusion.)

[deploy-contexts]: https://www.netlify.com/docs/continuous-deployment/#deploy-contexts

## Configuration

* Contentful credentials are hard coded.
* Netlify build and deploy settings are mostly in `netlify.toml` (see the previous section).
* Crawler instructions are defined in `robots.txt` and are always exported to `https://masifunde.netlify.com/robots.txt`.
* Routes are defined in `routes.js` using [next-routes](https://www.npmjs.com/package/next-routes).

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
ENABLED_FEATURES=all npm run dev

# Disable all features (the default in production)
ENABLED_FEATURES= npm run dev
```

The special `all` value always enables all feature flags.

Remember that feature flags are always temporary. Once a feature behind a
flag goes to production, simply remove the flag altogether.

Occasionally, you might experience that the site doesn't update properly
after restarting the development server with a different `ENABLED_FEATURES`
setting. In that case, try removing the `node_modules/.cache` folder.

[feature-flags]: https://martinfowler.com/articles/feature-toggles.html

## Bootstrap + styled-components
We use Bootstrap 4 for two purposes.
1. Responsive grid system
2. Style consistency across browsers ([reboot.css](https://getbootstrap.com/docs/4.0/content/reboot/))

Our components are given custom styling using [styled-components](https://www.styled-components.com/) - a CSS-in-JS library.

## Fundraisingbox
The service used to accept user donations is called [Fundraisingbox](https://www.fundraisingbox.com), which Masifunde has previous experience with.

Masifunde's Fundraisingbox plan doesn't allow for using the API, but we get access to an iframe we embed on our site. We can embed 4 different iframe forms at a time.
To configure the iframe, sign in to [Masifunde's Fundraisingbox admin interface](https://secure.fundraisingbox.com) and go to `Einstellungen > Spendenformular` and select the relevant Spendenformular in the dropdown.

To fully customize the form, we hide most of the inputs in iframe, while rendering our own form fields outside of the iframe. We then [populate the iframe with these custom form field values](https://developer.fundraisingbox.com/v1.0/docs/form-prepopulation-api). This forces a reload and rerender of the iframe, which causes flickering. So we only do this when all custom form fields have values.

### Einbettungsadresse (form embed url)
The _Einbettungsadresse_ should specify the full url of the page this form is used (e.g `https://www.masifunde.de/wie-sie-helfen/spenden`), and not just the host `https://www.masifunde.de`. 
On a successful (or failed) donation attempt, the user gets redirected to the exact url in _Einbettungsadresse_ with a `status` query param. 
Then a `success` or `error` message is displayed in the iframe. 
If the page doesn't have the Fundraisingbox iframe, no `success` or `error` message will be displayed.

### iframe styling
1. Sign in to [Masifunde's Fundraisingbox admin interface](https://secure.fundraisingbox.com).
2. Then go to `Einstellungen > Spendenformular` and select the relevant Spendenformular in the dropdown.
3. Scroll to the bottom of the `textarea` at the bottom of the page in the section `Design`.

By checking the box for `Keine Standard-Stylesheets laden` the Fundraisingbox iframe will use the css written in the `textarea`.

Note: This has to be standard css, *no scss or less*.

For version control and backup purposes we also store this css in the file `Fundraisingbox_custom_css.css` in this repo. 

### Testing Fundraisingbox locally

Fundraisingbox only displays the form in the iframe if you load the iframe from a specified domain, e.g. `masifunde.netlify.com`. In order to test it locally you need to expose your localhost. You can use [ngrok](https://ngrok.com/) for this. Install ngrok and run the command ```ngrok http 3000 --region eu```. You will then see the address to which ngrok exposes your localhost.

1. [Log into Masifunde's Fundraisingbox](https://secure.fundraisingbox.com).
2. In the top right go to `Einstellungen > Spendenformular`.
3. In the "Welches Formular wollen Sie bearbeiten" dropdown select the relevant Fundraising form.
4. Paste your ngrok address into the field "Einbettungsadresse".
5. Save.
6. If you go to your ngrok address you should now be able to see the Fundraising form.

## Contentful CMS

The project uses [Contentful](https://www.contentful.com/) as a CMS, which has its own JavaScript package. To better understand
the API structure you should sign in to Contentful and have a look at `Content models` to see how
they are structured. The credentials can be found in the Futurice password safe.

### Content model naming convention
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


## Tests

No tests for now.

## Style guide

Project uses [ESLint Airbnb style guide](https://github.com/airbnb/javascript) with some tweaks (like no semicolons). The `precommit` git hook will
automatically run ESLint to check if the code complies with the rules. If it fails then it will not
push to the repo.