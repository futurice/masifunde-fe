import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { injectGlobal } from 'styled-components'

import Header, { propTypes as headerPropTypes } from './Header'
import Footer from './Footer'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    color: #333333;
  }
`

function createTitle(title) {
  if (title === '') {
    return 'Masifunde'
  }

  return `${title} - Masifunde`
}

const Layout = ({
  title, description, headerData, children,
}) => (
  <div>
    <Head>
      <title>{createTitle(title)}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta.2/dist/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700" />
    </Head>
    <Header
      whatWeDoText={headerData.whatWeDoText}
      whoWeAreText={headerData.whoWeAreText}
      howToSupportText={headerData.howToSupportText}
      donateText={headerData.donateText}
    />
    {children}
    <Footer />
  </div>
)

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  headerData: PropTypes.shape(headerPropTypes),
}

Layout.defaultProps = {
  title: '',
  description: '',
  headerData: {
    whatWeDoText: 'Was wir machen',
    whoWeAreText: 'Who we are',
    howToSupportText: 'Wie Sie helfen',
    donateText: 'Spenden',
  },
}

export default Layout
