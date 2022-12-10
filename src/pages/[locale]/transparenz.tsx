import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getLayoutProps, LayoutPageProps } from '../../components/Layout'
import Head from '../../components/shared/Head'
import {
  getTransparencyContent,
  TransparencyContent,
} from '../../content/tranparenz-content'
import Markdown from '../../components/shared/Markdown'
import PageSection from '../../components/shared/PageSection'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & TransparencyContent

// Component
// =========

const Transparency: FC<Props> = ({
  metaTitle,
  metaDescription,
  heading,
  markdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{heading}</h1>
      <div className="row">
        <Markdown className="offset-lg-1 col-lg-10" source={markdown} />
      </div>
    </PageSection>
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getTransparencyContent(locale)),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  return {
    paths: [
      {
        params: { locale: 'de' },
      },
      {
        params: { locale: 'en' },
      },
    ],
    fallback: false,
  }
}

export default Transparency
