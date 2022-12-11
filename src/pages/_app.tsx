import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import Layout, { Props as LayoutProps } from '../components/layout/Layout'
import '../styling/font-faces.css'
import { initializeAnalytics, trackPageView } from '../utils/analytics'

type PageProps = {
  layoutProps?: LayoutProps
  [prop: string]: unknown
}

type Props = AppProps<PageProps>

const MasifundeApp: FC<Props> = ({ Component, pageProps }) => {
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

export default MasifundeApp
