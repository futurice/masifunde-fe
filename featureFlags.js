/* eslint-disable import/prefer-default-export */
import isFeatureEnabled from './utils/isFeatureEnabled'

export default {
  release10: isFeatureEnabled('release10'),
}
