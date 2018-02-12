let enabledFeatures

if (typeof process.env.ENABLED_FEATURES === 'string') {
  enabledFeatures = process.env.ENABLED_FEATURES.split(',')
  console.log('Feature flags: Enabling features', enabledFeatures)
} else if (process.env.NODE_ENV !== 'production') {
  enabledFeatures = ['*']
  console.log('Feature flags: Enabling all features.')
} else {
  enabledFeatures = []
  console.log('Feature flags: Enabling no features.')
}

export default function isFeatureEnabled(name) {
  return enabledFeatures.includes(name) || enabledFeatures.includes('*')
}
