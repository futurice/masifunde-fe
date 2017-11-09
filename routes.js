const nextRoutes = require('next-routes')
// eslint-disable-next-line no-multi-assign
const routes = module.exports = nextRoutes()

function addRoute(pattern, page) {
  routes.add({ name: page, pattern, page })
}

const Index = '/home'
const WhatWeDo = '/what-we-do'
const ApproachDE = '/what-we-do/approach-de'
const ApproachSA = '/what-we-do/approach-sa'
const Impact = '/what-we-do/impact'
const WhoWeAre = '/who-we-are'
const TeamDE = '/who-we-are/team-de'
const TeamSA = '/who-we-are/team-sa'
const Partners = '/who-we-are/partners'
const HowToSupport = '/how-to-support'
const BecomeSponsor = '/how-to-support/become-sponsor'
const BecomeVolunteer = '/how-to-support/become-volunteer'
const BecomePartner = '/how-to-support/become-partner'
const Donate = '/how-to-support/donate'
const Contact = '/how-to-support/contact'

// Register the routes
addRoute('/', Index)
addRoute('/was-wir-machen', WhatWeDo)
addRoute('/ansatz-de', ApproachDE)
addRoute('/ansatz-sa', ApproachSA)
addRoute('/effekte', Impact)
addRoute('/wer-wir-sind', WhoWeAre)
addRoute('/team-de', TeamDE)
addRoute('/team-sa', TeamSA)
addRoute('/partner', Partners)
addRoute('/wie-sie-helfen', HowToSupport)
addRoute('/pate-werden', BecomeSponsor)
addRoute('/UNDEFINED1', BecomeVolunteer)
addRoute('/UNDEFINED2', BecomePartner)
addRoute('/spenden', Donate)
addRoute('/kontakt', Contact)

// To use with translations
// addRoute('/:locale(en)?/was-wir-machen', WhatWeDo)

// Share route names
routes.RouteNames = {
  Index,
  WhatWeDo,
  ApproachDE,
  ApproachSA,
  Impact,
  WhoWeAre,
  TeamDE,
  TeamSA,
  Partners,
  HowToSupport,
  BecomeVolunteer,
  BecomeSponsor,
  BecomePartner,
  Donate,
  Contact,
}
