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

// Register the routes
addRoute('/', Index)
addRoute('/was-wir-machen', WhatWeDo)
addRoute('/was-wir-machen/ansatz-de', ApproachDE)
addRoute('/was-wir-machen/ansatz-sa', ApproachSA)
addRoute('/was-wir-machen/effekte', Impact)
addRoute('/wer-wir-sind', WhoWeAre)
addRoute('/wer-wir-sind/team-de', TeamDE)
addRoute('/wer-wir-sind/team-sa', TeamSA)
addRoute('/wie-sie-helfen', HowToSupport)
addRoute('/wie-sie-helfen/pate-werden', BecomeSponsor)
addRoute('/wie-sie-helfen/aktiv-werden', BecomeVolunteer)
addRoute('/wie-sie-helfen/partner-werden', BecomePartner)
addRoute('/wie-sie-helfen/spenden', Donate)
addRoute('/kontakt', Contact)
addRoute('/impressum', Impressum)

// To use with translations
// addRoute('/:locale(en)?/was-wir-machen', WhatWeDo)

// Share route names
nextRoutes.RouteNames = {
  Index,
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
  Impressum,
}

module.exports = nextRoutes
