/* eslint-disable no-underscore-dangle */
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

export default function LayoutWrapper(Page) {
  class GetInitialPropsWrapper extends React.Component {
    state = {}

    componentDidMount() {
      const context = window.__NEXT_DATA__
      if (this.isPreview(context)) {
        Page.getInitialProps(context)
          .then((response) => {
            this.setState({ ...response })
          })
      }
    }

    isPreview = ({ query }) => !!Object.keys(query).find(entry => entry === 'preview')

    render() {
      const { headerData, footerData, ...rest } = this.props
      return (
        <Layout headerData={headerData} footerData={footerData}>
          <Page {...rest} {...this.state} />
        </Layout>
      )
    }
  }

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
