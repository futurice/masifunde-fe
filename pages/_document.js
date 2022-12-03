import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

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
        <Head>
          {/* Favicon */}
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-16x16.png"
            sizes="16x16"
          />

          {/* CSS: Bootstrap */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0/dist/css/bootstrap.min.css"
          />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-141682105-2"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-141682105-2');
           `}
          </Script>

          {styles}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
