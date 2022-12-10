/**
 * A simple interface for collecting page analytics.
 * The current implementation uses Google Analytics.
 *
 * @module
 */

import * as ReactGA from 'react-ga'
import { GOOGLE_ANALYTICS_ID } from '../env'

/**
 * Initializes the analytics library.
 */
export function initializeAnalytics() {
  if (GOOGLE_ANALYTICS_ID) {
    ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
      gaOptions: {
        anonymizeIp: true,
      },
    })
  }
}

/**
 * Records a page view by sending it to the analytics backend.
 */
export function trackPageView(path) {
  if (GOOGLE_ANALYTICS_ID) {
    ReactGA.pageview(path)
  }
}
