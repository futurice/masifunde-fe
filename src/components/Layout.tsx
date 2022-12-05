import { FC, ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/router'
import T from 'i18n-react'
import { IconContext } from 'react-icons'

import theme from '../styling/theme'
import translationsDE from '../i18n/de.json'
import translationsEN from '../i18n/en.json'
import { fetchFooterData, fetchHeaderData } from '../content/shared/common'
import Footer from './Footer'
import Header from './Header'
import CookieNotice from './CookieNotice'
import GlobalStyle from './GlobalStyle'

// Props
// =====

export type Props = {
  locale: string
  headerData: HeaderProps
  footerData: FooterProps
  children: ReactNode
}

export type LayoutPageProps = {
  layoutProps: Omit<Props, 'children'>
}

export type HeaderProps = {
  whatWeDoText: string
  whoWeAreText: string
  howToSupportText: string
  donateText: string
}

export type FooterProps = {
  whatWeDoText: string
  approachSaText: string
  approachDeText: string
  impactText: string
  whoWeAreText: string
  teamSaText: string
  teamDeText: string
  howToSupportText: string
  donateText: string
  becomeSponsorText: string
  becomeVolunteerText: string
  becomePartnerText: string
  contactText: string
  blogText: string
  documentsText: string
  podcastText: string
  copyrightText: string
  masifundeYouTubeUrl: string
  masifundeFacebookUrl: string
  masifundeInstagramUrl: string
  ibanText: string
  bicText: string
  impressumText: string
  datenschutzText: string
}

// Helpers
// =======

const translations = {
  de: translationsDE,
  en: translationsEN,
}

const Content = styled.main.attrs({ role: 'main' })`
  padding-top: ${(props) => props.theme.headerHeight};
`

// Component
// =========

const Layout: FC<Props> = ({ headerData, children, footerData }) => {
  const router = useRouter()
  const locale = router.query.locale as 'de' | 'en'
  T.setTexts(translations[locale])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <>
          <Header height={theme.headerHeight} {...headerData} />
          <Content>
            <CookieNotice />
            {children}
          </Content>
          <Footer {...footerData} />
        </>
      </IconContext.Provider>
    </ThemeProvider>
  )
}

export default Layout

// Functions
// =========

/**
 * Fetches the data required by the Layout component.
 *
 * Call this from each page's `getServerSideProps` function and
 * spread the result into the page's props object:
 *
 * ```js
 * export async function getServerSideProps({ query: { locale } }) {
 *   return {
 *     props: {
 *       ...(await getLayoutProps(locale)),
 *       // page-specific props
 *    }
 * }
 * ```
 *
 * These will then be forwarded
 * to the Layout (see `pages/_app.js`).
 *
 * @param {string} locale - The page's locale.
 * @returns {object} The props needed by `Layout`.
 */
export async function getLayoutProps(locale: string): Promise<LayoutPageProps> {
  return {
    layoutProps: {
      locale,
      headerData: await fetchHeaderData(locale),
      footerData: await fetchFooterData(locale),
    },
  }
}
