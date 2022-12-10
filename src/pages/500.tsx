import { GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import { LayoutPageProps, getLayoutProps } from '../components/Layout'
import Head from '../components/shared/Head'
import Markdown from '../components/shared/Markdown'
import PageSection from '../components/shared/PageSection'
import { Error500Content, getError500Content } from '../content/500-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & Error500Content

// Helpers
// =======

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

// Component
// =========

const ErrorPage500: FC<Props> = ({ metaTitle, title, descriptionMarkdown }) => (
  <>
    <Head title={metaTitle} />

    <PageSection>
      <h1>{title}</h1>
      <StyledMarkdown source={descriptionMarkdown} />
    </PageSection>
  </>
)

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  return {
    props: {
      // As the URL of an error page is fixed, it's not possible to get
      // the locale as a path param. Assume German for now.
      ...(await getLayoutProps('de')),
      ...(await getError500Content('de')),
    },
  }
}

export default ErrorPage500
