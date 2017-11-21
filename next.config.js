const Routes = require('./routes')

// It can't handle complex patterns like: /blog/:id/
function createRoutesFromNextRoutes() {
  return Routes.routes.reduce((map, { pattern, page }) => {
    // eslint-disable-next-line no-param-reassign
    map[pattern] = { page }
    return map
  }, {})
}

module.exports = {
  exportPathMap() {
    return createRoutesFromNextRoutes()
  },
}
