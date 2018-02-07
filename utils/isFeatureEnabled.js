let enabledFeatures

if (typeof process.env.ENABLED_FEATURES === 'string') {
  enabledFeatures = process.env.ENABLED_FEATURES.split(',')
} else if (process.env.NODE_ENV !== 'production') {
  enabledFeatures = ['*']
} else {
  enabledFeatures = []
}

export default function isFeatureEnabled(name) {
  return enabledFeatures.includes(name) || enabledFeatures.includes('*')
}
