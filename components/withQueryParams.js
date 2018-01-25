import React, { Component } from 'react'
import qs from 'qs'

export default function withQueryParams(WrappedComponent) {
  class SetQueryParams extends Component {
    static async getInitialProps(ctx) {
      return WrappedComponent.getInitialProps ? WrappedComponent.getInitialProps(ctx) : {}
    }

    state = {}

    componentDidMount = () => {
      const query = qs.parse(window.location.search, { ignoreQueryPrefix: true })

      this.setState({ query })
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

  return SetQueryParams
}
