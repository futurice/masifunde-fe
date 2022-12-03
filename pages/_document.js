import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return {
      ...(await Document.getInitialProps(ctx)),
      lang: ctx.pathname.startsWith('/en') ? 'en' : 'de',
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
