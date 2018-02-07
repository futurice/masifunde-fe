/* eslint-disable import/prefer-default-export */
import isFeatureEnabled from './utils/isFeatureEnabled'

export default {
  blog: isFeatureEnabled('blog'),
}
