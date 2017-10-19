import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import Navigation from './Navigation/'
import Footer from './Footer'

const Layout = props => (
  <div>
    <Head>
      <title>{props.title}</title>
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
  title: 'Masifunde',
  description: 'Masifunde',
}

export default Layout
