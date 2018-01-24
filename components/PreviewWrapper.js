/* eslint-disable no-underscore-dangle */
import React from 'react'

import { IS_PREVIEW } from '../env'

export default function PreviewWrapper(Page) {
  class GetInitialPropsWrapper extends React.Component {
    state = {}

    componentDidMount() {
      const context = window.__NEXT_DATA__
      if (IS_PREVIEW) {
        Page.getInitialProps(context)
          .then((response) => {
            this.setState({ ...response })
          })
      }
    }

    render() {
      return (
        <Page {...this.props} {...this.state} />
      )
    }
  }

  GetInitialPropsWrapper.getInitialProps = async function getInitialPropsWrapper(ctx) {
    const pageInitialProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}

    return {
      ...pageInitialProps,
    }
  }

  return GetInitialPropsWrapper
}
