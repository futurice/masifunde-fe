import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LayoutWrapper from '../components/LayoutWrapper'
import Head from '../components/Head'
import Banner from '../components/Banner'
import { getLocaleFromQuery } from '../utils/locale'
import PageSection from '../components/PageSection'
import Markdown from '../components/Markdown'
import { fetchErrorPage404 } from '../api/404'

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

const ErrorPage404 = ({
  bannerButtonText,
  bannerButtonUrl,
  bannerTitle,
  metaTitle,
  section1Markdown,
  section1Title,
}) => (
  <Fragment>
    <Head title={metaTitle} />

    <PageSection>
      <h1>{section1Title}</h1>
      <StyledMarkdown source={section1Markdown} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </Fragment>
)

ErrorPage404.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

ErrorPage404.getInitialProps = async function initialProps({ query }) {
  return fetchErrorPage404(getLocaleFromQuery(query))
}

export default LayoutWrapper(ErrorPage404)
