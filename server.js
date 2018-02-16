const { createServer } = require('http')
const next = require('next')
// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

// If the ENABLED_FEATURES environment variable is set, clear the babel-loader
// cache to ensure that the feature flag configuration ends up in the compiled
// bundle.
if (typeof process.env.ENABLED_FEATURES === 'string') {
  rimraf.sync(`${__dirname}/node_modules/.cache/babel-loader`)
}

app.prepare()
  .then(() => {
    createServer(handler)
      .listen(port, (err) => {
        if (err) throw err
        // eslint-disable-next-line no-console
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
