// NOTE: Using CommonJS imports / exports for use in next.config.js

const nextRoutes = require('next-routes')()
const locales = require('./i18n/locales')

/**
 * Adds the locale stem to pattern.
 *
 * @param {string} pattern
 */
function withLocale(pattern) {
  const localeConstraint = locales.filter(l => l !== 'de').join('|')
  const localePrefix = `/:locale(${localeConstraint})?`
  return pattern === '/' ? localePrefix : `${localePrefix}${pattern}`
}

/**
 * Adds locale-enabled route where page and name are the same.
 *
 * @param {string} pattern
 * @param {string} page
 */
function addRoute(pattern, page) {
  nextRoutes.add({
    name: page,
    pattern: withLocale(pattern),
    page,
  })
}

// Paths to pages
const Index = '/home'
const ErrorPage404 = '/404'
const WhatWeDo = '/what-we-do'
const ApproachDE = '/what-we-do/approach-de'
const ApproachSA = '/what-we-do/approach-sa'
const Impact = '/what-we-do/impact'
const WhoWeAre = '/who-we-are'
const TeamDE = '/who-we-are/team-de'
const TeamSA = '/who-we-are/team-sa'
const HowToSupport = '/how-to-support'
const Donate = '/how-to-support/donate'
const BecomeSponsor = '/how-to-support/become-sponsor'
const BecomeVolunteer = '/how-to-support/become-volunteer'
const BecomePartner = '/how-to-support/become-partner'
const Blog = '/blog'
const BlogPost = '/blog/blog-post'
const Contact = '/contact'
const Impressum = '/impressum'
const Datenschutz = '/datenschutz'
const Transparency = '/transparency'
const Campaign = '/campaign'
const Press = '/press'
const Documents = '/documents'
const Podcast = '/podcasts'

// Register the routes
addRoute('/', Index)
addRoute('/404', ErrorPage404)
addRoute('/was-wir-machen', WhatWeDo)
addRoute('/was-wir-machen/ansatz-de', ApproachDE)
addRoute('/was-wir-machen/ansatz-sa', ApproachSA)
addRoute('/was-wir-machen/effekte', Impact)
addRoute('/wer-wir-sind', WhoWeAre)
addRoute('/wer-wir-sind/team-de', TeamDE)
addRoute('/wer-wir-sind/team-sa', TeamSA)
addRoute('/wie-sie-helfen', HowToSupport)
addRoute('/wie-sie-helfen/masifunde-gemeinschaft', BecomeSponsor)
addRoute('/wie-sie-helfen/aktiv-werden', BecomeVolunteer)
addRoute('/wie-sie-helfen/partner-werden', BecomePartner)
addRoute('/wie-sie-helfen/spenden', Donate)
addRoute('/kontakt', Contact)
addRoute('/impressum', Impressum)
addRoute('/datenschutz', Datenschutz)
addRoute('/blog/page/:page', Blog)
addRoute('/blog/:slug', BlogPost)
addRoute('/spendenaktion', Campaign)
addRoute('/presse', Press)
addRoute('/dokumente', Documents)
addRoute('/transparenz', Transparency)
addRoute('/podcasts', Podcast)

// Share route names
nextRoutes.RouteNames = {
  Index,
  ErrorPage404,
  WhatWeDo,
  ApproachDE,
  ApproachSA,
  Impact,
  WhoWeAre,
  TeamDE,
  TeamSA,
  HowToSupport,
  BecomeVolunteer,
  BecomeSponsor,
  BecomePartner,
  Donate,
  Contact,
  Blog,
  BlogPost,
  Datenschutz,
  Impressum,
  Transparency,
  Campaign,
  Press,
  Documents,
  Podcast,
}

module.exports = nextRoutes
