import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import Hero from '../../../components/Hero'
import Link from '../../../components/Link'
import StatList from '../../../components/StatList'
import Tagline from '../../../components/Tagline'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Button from '../../../components/shared/Button'
import EmbeddedVideo from '../../../components/shared/EmbeddedVideo'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import StatView from '../../../components/shared/StatView'
import ProjectsGrid from '../../../components/was-wir-machen/ProjectsGrid'
import {
  WhatWeDoContent,
  getWhatWeDoContent,
} from '../../../content/was-wir-machen-content'
import * as pages from '../../../routes/pages'
import { smallSpacing } from '../../../styling/sizes'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & WhatWeDoContent

// Helpers
// =======

const ImpactButton = styled(Button)`
  margin-top: ${smallSpacing};
`

// Component
// =========

const WhatWeDo: FC<Props> = ({
  // Metadata
  metaTitle,
  metaDescription,
  // Hero
  heroTitle,
  // Intro
  introHeading0,
  introText,
  // Video
  videoUrl,
  // Country Projects
  introHeading,
  // Country Projects: South Africa
  projectsTitleSa,
  projectsDescriptionSa,
  projectsSa,
  projectsButtonSa,
  // Country Projects: Germany
  projectsTitleDe,
  projectsDescriptionDe,
  projectsDe,
  projectsButtonDe,
  // Tagline
  centerHeading,
  // Impact Stats
  statsHeading,
  stats,
  statsButton,
  // Outro
  outroHeading,
  outroText,
  outroTextColumn2,
  // Banner
  bannerButtonText,
  bannerTitle,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-student.jpg"
      headline={heroTitle}
      headlineShadow
      headlinePlacement="bottom"
    />

    <PageSection>
      <h1>{introHeading0}</h1>
      <CenteredText source={introText} />
    </PageSection>

    <PageSection contained={false}>
      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    <PageSection>
      <h1>{introHeading}</h1>
      <ProjectsGrid
        leftCountry={{
          title: projectsTitleSa,
          description: projectsDescriptionSa,
          projects: projectsSa,
          button: projectsButtonSa,
          buttonLink: pages.approachSA,
        }}
        rightCountry={{
          title: projectsTitleDe,
          description: projectsDescriptionDe,
          projects: projectsDe,
          button: projectsButtonDe,
          buttonLink: pages.approachDE,
        }}
      />
    </PageSection>

    <Tagline text={centerHeading} />

    <PageSection>
      <h1>{statsHeading}</h1>
      <StatList>
        {stats.map((stat, index) => (
          <StatView
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={String(index + 1)}
            sourceId={`stat-${index}`}
          />
        ))}
      </StatList>
      <Link href={pages.impact} passHref>
        <ImpactButton center variant="secondary">
          {statsButton}
        </ImpactButton>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{outroHeading}</h1>
      <div className="row">
        <Markdown className="col-md-6" source={outroText} />
        <Markdown className="col-md-6" source={outroTextColumn2} />
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
      ...(await getWhatWeDoContent(locale)),
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

export default WhatWeDo
