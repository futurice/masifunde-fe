import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import Banner from '../../../components/Banner'
import Hero from '../../../components/Hero'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import CenteredText from '../../../components/shared/CenteredText'
import EmbeddedVideo from '../../../components/shared/EmbeddedVideo'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import Tagline from '../../../components/shared/Tagline'
import ProjectDetailsList from '../../../components/was-wir-machen/ProjectDetailsList'
import {
  ApproachSAContent,
  getApproachSAContent,
} from '../../../content/was-wir-machen-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & ApproachSAContent

// Component
// =========

const ApproachSa: FC<Props> = ({
  metaTitle,
  metaDescription,
  title,
  introTitle,
  introMarkdown,
  projects,
  videoUrl,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
  outroTitle,
  outroMarkdown1,
  outroMarkdown2,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-classroom.jpg"
      heroSize="small"
      backgroundPositionX="80%"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <ProjectDetailsList projects={projects} />
    </PageSection>

    <PageSection contained={false}>
      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    <PageSection>
      <h2>{outroTitle}</h2>
      <div className="row">
        <Markdown className="col-md-6" source={outroMarkdown1} />
        <Markdown className="col-md-6" source={outroMarkdown2} />
      </div>
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getApproachSAContent(locale)),
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

export default ApproachSa
