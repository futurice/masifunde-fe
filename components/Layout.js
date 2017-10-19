import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import Navigation from './Navigation/'
import Footer from './Footer'

function createTitle(title) {
  if (title === '') {
    return 'Masifunde'
  }

  return `${title} - Masifunde`
}


const Layout = props => (
  <div>
    <Head>
      <title>{createTitle(props.title)}</title>
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato"
      />
    </Head>
    <Navigation />
    {props.children}
    <Footer />
  </div>
)

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  title: '',
  description: '',
}

export default Layout
