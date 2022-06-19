import React, { Component } from 'react'
import * as ReactGA from 'react-ga'

import { GOOGLE_ANALYTICS_ID } from '../env'

const gaOptions = {
  anonymizeIp: true,
}

if (GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions,
  })
}

const withAnalytics = (WrappedComponent) =>
  class GaWrapper extends Component {
    componentDidMount = () => {
      if (GOOGLE_ANALYTICS_ID) {
        this.trackPageView()
      }
    }

    trackPageView = (
      path = window.location.pathname + window.location.search
    ) => {
      ReactGA.pageview(path)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

export default withAnalytics
