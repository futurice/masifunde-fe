import { FC } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  getImpactContent,
  ImpactContent,
} from '../../../content/was-wir-machen-content'
import { getLayoutProps, LayoutPageProps } from '../../../components/Layout'
import Head from '../../../components/shared/Head'
import Hero from '../../../components/Hero'
import Banner from '../../../components/Banner'
import Stat from '../../../components/Stat'
import Tagline from '../../../components/Tagline'
import PageSection from '../../../components/shared/PageSection'
import StatList from '../../../components/StatList'
import Markdown from '../../../components/shared/Markdown'
import EmbeddedVideo from '../../../components/shared/EmbeddedVideo'
import StoryCarousel from '../../../components/shared/StoryCarousel'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & ImpactContent

// Component
// =========

const Impact: FC<Props> = ({
  metaTitle,
  metaDescription,
  title,
  videoUrl,
  stats1Title,
  stats1,
  stats2Title,
  stats2,
  portrait1,
  portrait2,
  outroTitle,
  outroMarkdown,
  outroTextColumn2,
  bannerText,
  bannerButtonText,
  bannerButtonUrl,
}) => {
  let superscript = 0

  return (
    <div>
      <Head title={metaTitle} description={metaDescription} />

      <Hero
        imageUrl="/static/images/hero/hero-small-arts.jpg"
        heroSize="small"
        backgroundPositionX="35%"
      />

      <Tagline text={title} hideTopRuler />

      {videoUrl && (
        <PageSection>
          <EmbeddedVideo videoUrl={videoUrl} />
        </PageSection>
      )}

      <PageSection>
        <h2>{stats1Title}</h2>
        <StatList>
          {stats1.map((stat) => (
            <Stat
              key={`${stat.number} ${stat.description}`}
              {...stat}
              superscriptText={stat.sourceMarkdown ? (superscript += 1) : null}
              sourceId={`impact-source-${superscript}`}
            />
          ))}
        </StatList>
      </PageSection>

      {stats2 && stats2.length > 0 && (
        <PageSection>
          <h2>{stats2Title}</h2>
          <StatList>
            {stats2.map((stat) => (
              <Stat
                key={`${stat.number} ${stat.description}`}
                {...stat}
                superscriptText={
                  stat.sourceMarkdown ? (superscript += 1) : null
                }
                sourceId={`impact-source-${superscript}`}
              />
            ))}
          </StatList>
        </PageSection>
      )}

      <PageSection contained={false}>
        <StoryCarousel
          slides={[
            {
              imageUrl: portrait1.page1Image.file.url,
              heading: portrait1.page1Heading,
              text: portrait1.page1Text,
            },
            {
              imageUrl: portrait1.page2Image.file.url,
              heading: portrait1.page2Heading,
              text: portrait1.page2Text,
            },
            {
              imageUrl: portrait1.page3Image.file.url,
              heading: portrait1.page3Heading,
              text: portrait1.page3Text,
            },
          ]}
        />
      </PageSection>

      <PageSection contained={false}>
        <StoryCarousel
          slides={[
            {
              imageUrl: portrait2.page1Image.file.url,
              heading: portrait2.page1Heading,
              text: portrait2.page1Text,
            },
            {
              imageUrl: portrait2.page2Image.file.url,
              heading: portrait2.page2Heading,
              text: portrait2.page2Text,
            },
            {
              imageUrl: portrait2.page3Image.file.url,
              heading: portrait2.page3Heading,
              text: portrait2.page3Text,
            },
          ]}
        />
      </PageSection>

      <PageSection>
        <h2>{outroTitle}</h2>
        <div className="row">
          <Markdown className="col-md-6" source={outroMarkdown} />
          <Markdown className="col-md-6" source={outroTextColumn2} />
        </div>
      </PageSection>

      <Banner
        headline={bannerText}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getImpactContent(locale)),
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

export default Impact
