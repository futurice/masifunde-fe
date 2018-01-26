/* eslint-disable no-underscore-dangle */
import React from 'react'

import { IS_PREVIEW } from '../env'

// Checks if we're currently running on the preview environment.
// If we are, fetch all the data directly from Contentful.
//
// This is to make sure the page requested from the server is displaying the most up to date
// Contentful data - not the data that was in Contentful when the static page was generated.
// The generation and deploy of the site can take several minutes when doing many updates in
// Contentful, which forces content editors to wait in order to preview their changes.
// This wrapper makes the changes instantly appear on the page in the preview environment.
//
// Because the page is first shown with the content from the server rendered page, the old content
// will be displayed briefly before being overwritten by the newer content fetched from Contentful.
export default function withPreviewCheck(Page) {
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
