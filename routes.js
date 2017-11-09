const nextRoutes = require('next-routes')
// eslint-disable-next-line no-multi-assign
const routes = module.exports = nextRoutes()

routes.add('/', '/home')
routes.add('/was-wir-machen', '/what-we-do')
routes.add('/ansatz-de', '/what-we-do/approach-de')
routes.add('/ansatz-sa', '/what-we-do/approach-sa')
routes.add('/effekte', '/what-we-do/impact')
routes.add('/wer-wir-sind', '/who-we-are')
routes.add('/team-de', '/who-we-are/team-de')
routes.add('/team-sa', '/who-we-are/team-sa')
routes.add('/partner', '/who-we-are/partners')
routes.add('/wie-sie-helfen', '/how-to-support')
routes.add('/pate-werden', '/how-to-support/become-sponsor')
routes.add('/UNDEFINED1', '/how-to-support/become-volunteer')
routes.add('/UNDEFINED2', '/how-to-support/become-partner')
routes.add('/partner', '/donate')
routes.add('/contact', '/contact')

// To use with translations
// routes.add('/:locale(en)?/was-wir-machen', '/what-we-do')
