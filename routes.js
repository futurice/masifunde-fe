const nextRoutes = require('next-routes')()

/**
 * Creates routes where page and name are the same
 *
 * @param  {string} pattern
 * @param {string} page
 */
function addRoute(pattern, page) {
  nextRoutes.add({ name: page, pattern, page })
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
const Contact = '/contact'
const Impressum = '/impressum'
const Datenschutz = '/datenschutz'

// Register the routes
addRoute('/:locale(en)?', Index)
addRoute('/:locale(en)?/404', ErrorPage404)
addRoute('/:locale(en)?/was-wir-machen', WhatWeDo)
addRoute('/:locale(en)?/was-wir-machen/ansatz-de', ApproachDE)
addRoute('/:locale(en)?/was-wir-machen/ansatz-sa', ApproachSA)
addRoute('/:locale(en)?/was-wir-machen/effekte', Impact)
addRoute('/:locale(en)?/wer-wir-sind', WhoWeAre)
addRoute('/:locale(en)?/wer-wir-sind/team-de', TeamDE)
addRoute('/:locale(en)?/wer-wir-sind/team-sa', TeamSA)
addRoute('/:locale(en)?/wie-sie-helfen', HowToSupport)
addRoute('/:locale(en)?/wie-sie-helfen/pate-werden', BecomeSponsor)
addRoute('/:locale(en)?/wie-sie-helfen/aktiv-werden', BecomeVolunteer)
addRoute('/:locale(en)?/wie-sie-helfen/partner-werden', BecomePartner)
addRoute('/:locale(en)?/wie-sie-helfen/spenden', Donate)
addRoute('/:locale(en)?/kontakt', Contact)
addRoute('/:locale(en)?/impressum', Impressum)
addRoute('/:locale(en)?/datenschutz', Datenschutz)

// To use with translations
// addRoute('/:locale(en)?/was-wir-machen', WhatWeDo)

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
  Datenschutz,
  Impressum,
}

module.exports = nextRoutes
