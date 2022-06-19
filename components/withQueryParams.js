import React, { Component } from 'react'
import qs from 'qs'

/**
 * The query parameters from getInitialProps works only with backend or on development.
 * On statically generated pages query parameters are not passed.
 *
 * This HOC will pass to the WrappedComponent query.
 */
export default function withQueryParams(WrappedComponent) {
  class SetQueryParams extends Component {
    static async getInitialProps(ctx) {
      return WrappedComponent.getInitialProps
        ? WrappedComponent.getInitialProps(ctx)
        : {}
    }

    state = {
      query: {},
    }

    componentDidMount = () => {
      const query = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      })

      this.setState({ query })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  return SetQueryParams
}
