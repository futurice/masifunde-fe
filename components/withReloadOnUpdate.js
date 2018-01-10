import React, { Component } from 'react'

import {
  onAppUpdated,
  onRouteChangeStart,
  onRouteChangeComplete,
  onRouteChangeError,
} from '../utils/routerEvents'

function reloadPage(nextUrl) {
  window.location.href = nextUrl
}

/**
 * Prevents route changes from silently failing if a new version of the
 * website was deployed while a user still has the previous version open.
 * The failure is due to Next.js' "build ID" mechanism, which prevents one
 * website version to load code chunks from another version because of
 * possible incompatibilities. See the explanation on the Next.js wiki:
 *
 * https://github.com/zeit/next.js/wiki/Deployment
 *
 * This wrapper component handles these failures by doing a full reload
 * with the target page URL, "upgrading" the user to the new version. From
 * the user's perspective, this will appear pretty much like an ordinary
 * (if less snappy) page load.
 */
export default function withReloadOnUpdate(WrappedComponent) {
  class ReloadOnSiteUpdate extends Component {
    componentDidMount() {
      // Theoretically, this should be everything that's needed to reload the
      // page once the site's version changed. However, there is currently
      // (v4.2.1) a bug in Next.js that prevents this this not work for
      // static HTML exports:
      //
      // https://github.com/zeit/next.js/issues/3558
      //
      // The code is still here for the case that the problem gets fixed on the
      // Next.js side. Then it should Just Work.
      onAppUpdated((url) => {
        reloadPage(url)
      })

      // As a workaround for the bug above, we try to detect version-related
      // route change failures with a timeout. If the route change does not
      // complete in a few seconds, we assume that the target page's code
      // chunk has disappeard (because there is a newer version with a new
      // build ID, hence different file paths). We then reload with the
      // target pages' URL.

      const reloadTimeout = 5000 // ms
      let reloadTimeoutId = null

      onRouteChangeStart((url) => {
        reloadTimeoutId = setTimeout(() => reloadPage(url), reloadTimeout)
      })

      onRouteChangeComplete(() => clearTimeout(reloadTimeoutId))
      onRouteChangeError(() => clearTimeout(reloadTimeoutId))
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return ReloadOnSiteUpdate
}
