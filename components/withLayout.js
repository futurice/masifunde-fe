import React from 'react'
import PropTypes from 'prop-types'

import { getLocaleFromQuery } from '../utils/locale'
import {
  fetchHeaderData,
  fetchFooterData,
} from '../api/common'
import Layout from './Layout'
import { propTypes as headerPropTypes } from '../components/Header/index'
import { propTypes as footerPropTypes } from '../components/Footer'
import withPreviewCheck from './withPreviewCheck'

function withLayout(Page) {
  const GetInitialPropsWrapper = ({ headerData, footerData, ...rest }) => (
    <Layout headerData={headerData} footerData={footerData}>
      <Page {...rest} />
    </Layout>
  )

  GetInitialPropsWrapper.propTypes = {
    headerData: PropTypes.shape(headerPropTypes).isRequired,
    footerData: PropTypes.shape(footerPropTypes).isRequired,
  }

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

export default Page => withLayout(withPreviewCheck(Page))
