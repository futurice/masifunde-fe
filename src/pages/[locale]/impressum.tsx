import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { LayoutPageProps, getLayoutProps } from '../../components/Layout'
import Head from '../../components/shared/Head'
import Markdown from '../../components/shared/Markdown'
import PageSection from '../../components/shared/PageSection'
import {
  LegalNoticeContent,
  getLegalNoticeContent,
} from '../../content/impressum-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & LegalNoticeContent

// Component
// =========

const LegalNotice: FC<Props> = ({
  metaTitle,
  metaDescription,
  impressumTitle,
  impressumMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{impressumTitle}</h1>
      <div className="row">
        <Markdown
          className="offset-lg-1 col-lg-10"
          source={impressumMarkdown}
        />
      </div>
    </PageSection>
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getLegalNoticeContent(locale)),
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

export default LegalNotice
