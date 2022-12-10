import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import Hero from '../../../components/Hero'
import { LayoutPageProps, getLayoutProps } from '../../../components/Layout'
import RoundedImage from '../../../components/RoundedImage'
import Stat from '../../../components/Stat'
import StatList from '../../../components/StatList'
import Tagline from '../../../components/Tagline'
import ContactDetails from '../../../components/shared/ContactDetails'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import ProjectDetailsList from '../../../components/was-wir-machen/ProjectDetailsList'
import {
  ApproachDEContent,
  getApproachDEContent,
} from '../../../content/was-wir-machen-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & ApproachDEContent

// Helpers
// =======

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 900px;
`

// Component
// =========

const ApproachDE: FC<Props> = ({
  metaTitle,
  metaDescription,
  title,
  introHeading,
  introText,
  projects,
  image1,
  statsTitle,
  stats,
  section1Title,
  section1Markdown,
  teamMember,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-library.jpg"
      heroSize="small"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introText} />
      <ProjectDetailsList projects={projects} />
    </PageSection>

    <PageSection>
      <ImageContainer>
        <RoundedImage
          className="img-fluid"
          src={image1.file.url}
          alt={image1.title}
        />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <h2>{statsTitle}</h2>
      <StatList>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={index + 1}
            sourceId={`impact-source-${index}`}
          />
        ))}
      </StatList>
    </PageSection>

    <PageSection>
      <ContactDetails
        title={section1Title}
        markdownText={section1Markdown}
        contactPersonImageUrl={teamMember.profileImage!.file.url}
        contactPersonTitle={teamMember.name}
        contactPersonSubtitle={teamMember.responsibilityArea ?? ''}
        contactPersonEmail={teamMember.email}
      />
    </PageSection>

    <Banner
      buttonLink={bannerButtonUrl}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getApproachDEContent(locale)),
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

export default ApproachDE
