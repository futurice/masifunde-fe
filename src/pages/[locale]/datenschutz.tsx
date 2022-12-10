import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getLayoutProps, LayoutPageProps } from '../../components/Layout'
import Head from '../../components/shared/Head'
import {
  PrivacyPolicyContent,
  getPrivacyPolicyContent,
} from '../../content/datenschutz-content'
import Markdown from '../../components/shared/Markdown'
import PageSection from '../../components/shared/PageSection'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & PrivacyPolicyContent

// Component
// =========

const PrivacyPolicy: FC<Props> = ({
  metaTitle,
  metaDescription,
  datenschutzTitle,
  datenschutzMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{datenschutzTitle}</h1>
      <div className="row">
        <div className="col">
          <Markdown
            className="offset-lg-1 col-lg-10"
            source={datenschutzMarkdown}
          />
        </div>
      </div>
    </PageSection>
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getPrivacyPolicyContent(locale)),
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

export default PrivacyPolicy
