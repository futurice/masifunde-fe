// NOTE: Using CommonJS imports / exports for use in next.config.js
const featureFlags = require('../featureFlags')

module.exports = featureFlags.localization
  ? ['de', 'en']
  : ['de']
