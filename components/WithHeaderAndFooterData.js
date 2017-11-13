import React from 'react'

import { getContentfulLocale } from '../utils/locale'
import { fetchHeaderData } from '../api/contentful'

export default function WithHeaderAndFooterData(Page) {
  const GetInitialPropsWrapper = props => (
    <Page {...props} />
  )

  GetInitialPropsWrapper.getInitialProps = async function getInitialPropsWrapper(ctx) {
    const locale = getContentfulLocale(ctx.query)
    const headerData = await fetchHeaderData(locale)
    const pageInitialProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}

    return {
      headerData,
      ...pageInitialProps,
    }
  }

  return GetInitialPropsWrapper
}
