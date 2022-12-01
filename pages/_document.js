import React, { Fragment } from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  /**
   * Generates styled-componets stylesheets for injection as a `<style>` tag.
   * See: https://styled-components.com/docs/advanced#with-babel
   */
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>
        ),
        lang: ctx.pathname.startsWith('/en') ? 'en' : 'de',
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { lang, styles } = this.props

    return (
      <Html lang={lang}>
        <Head>{styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
