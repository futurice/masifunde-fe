// NOTE: Using CommonJS imports / exports for use in next.config.js
const isFeatureEnabled = require('./utils/isFeatureEnabled')

module.exports = {
  release10: isFeatureEnabled('release10'),
}
