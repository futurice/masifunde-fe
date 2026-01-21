import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'

type ExtraDocumentProps = {
  htmlLang: string
}

type InitialProps = DocumentInitialProps & ExtraDocumentProps

export default class MasifundeDocument extends Document<ExtraDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<InitialProps> {
    // Pre-compile styled-components styles so that they can be includeded
    // as <style> tags in the static HTML.
    //
    // https://styled-components.com/docs/advanced#nextjs

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
        styles: [initialProps.styles, sheet.getStyleElement()],
        // Dervie the value to use for the HTML `lang` attribute
        // from the page path.
        htmlLang: ctx.pathname.startsWith('/en') ? 'en' : 'de',
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { htmlLang, styles } = this.props

    return (
      <Html lang={htmlLang}>
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
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
            crossOrigin="anonymous"
          />

          {/* Google Analytics */}
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-19L3TWP7GQ" />
          <Script id="google-analytics-4">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-19L3TWP7GQ');
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
