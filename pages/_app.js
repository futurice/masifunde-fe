import PropTypes from 'prop-types'
import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from '../components/Layout'
import '../styling/font-faces.css'
import { initializeAnalytics, trackPageView } from '../utils/analytics'

const MasifundeApp = ({ Component, pageProps }) => {
  const { asPath } = useRouter()

  useEffect(() => initializeAnalytics(), [])
  useEffect(() => trackPageView(asPath), [asPath])

  const { layoutProps, ...props } = pageProps

  if (!layoutProps) {
    throw new Error(
      '`layoutProps` is missing from the page props. ' +
        'See getLayoutProps() in `components/Layout.js`.'
    )
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>

      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    </>
  )
}

MasifundeApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default MasifundeApp
