import { GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../components/Banner'
import { LayoutPageProps, getLayoutProps } from '../components/Layout'
import Head from '../components/shared/Head'
import Markdown from '../components/shared/Markdown'
import PageSection from '../components/shared/PageSection'
import { Error404Content, getError404Content } from '../content/404-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & Error404Content

// Helpers
// =======

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

// Component
// =========

const ErrorPage404: FC<Props> = ({
  bannerButtonText,
  bannerButtonUrl,
  bannerTitle,
  metaTitle,
  section1Markdown,
  section1Title,
}) => (
  <>
    <Head title={metaTitle} />

    <PageSection>
      <h1>{section1Title}</h1>
      <StyledMarkdown source={section1Markdown} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </>
)

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return {
    props: {
      // As the URL of an error page is fixed, it's not possible to get
      // the locale as a path param. Assume German for now.
      ...(await getLayoutProps('de')),
      ...(await getError404Content('de')),
    },
  }
}

export default ErrorPage404
