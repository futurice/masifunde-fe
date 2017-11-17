import React from 'react'

import { getLocaleFromQuery } from '../utils/locale'
import {
  fetchHeaderData,
  fetchFooterData,
} from '../api/common'

export default function WithHeaderAndFooterData(Page) {
  const GetInitialPropsWrapper = props => (
    <Page {...props} />
  )

  GetInitialPropsWrapper.getInitialProps = async function getInitialPropsWrapper(ctx) {
    const locale = getLocaleFromQuery(ctx.query)
    const headerData = await fetchHeaderData(locale)
    const footerData = await fetchFooterData(locale)
    const pageInitialProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : {}

    return {
      headerData,
      footerData,
      ...pageInitialProps,
    }
  }

  return GetInitialPropsWrapper
}
