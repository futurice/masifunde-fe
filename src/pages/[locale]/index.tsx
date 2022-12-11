import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import Hero from '../../components/Hero'
import StatList from '../../components/StatList'
import BlogPostCard from '../../components/blog/BlogPostCard'
import { LayoutPageProps, getLayoutProps } from '../../components/layout/Layout'
import EmbeddedVideo from '../../components/shared/EmbeddedVideo'
import Head from '../../components/shared/Head'
import PageSection from '../../components/shared/PageSection'
import StatView from '../../components/shared/StatView'
import StoryCarousel from '../../components/shared/StoryCarousel'
import { BlogPost, getNewestBlogPosts } from '../../content/blog-content'
import { HomeContent, getHomeContent } from '../../content/home-content'
import * as pages from '../../routes/pages'
import { mdBreakpoint } from '../../styling/breakpoints'
import { mediumSpacing, smallSpacing } from '../../styling/sizes'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps &
  HomeContent & {
    featuredBlogPosts: BlogPost[]
  }

// Helpers
// =======

const BlogPostList = styled.ul`
  list-style: none;
  padding: 0;
`

const BlogPostListItem = styled.li`
  margin-bottom: ${smallSpacing};

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${mdBreakpoint}) {
    margin-bottom: 0;
  }

  /* Let the contained BlogPostCard stretch to full height */
  > * {
    height: 100%;
  }
`

const ExtendedBanner = styled(Banner)`
  margin-bottom: ${mediumSpacing};
`

// Component
// =========

const Home: FC<Props> = ({
  metaTitle,
  metaDescription,
  heroTitle,
  stats,
  banner1Title,
  banner1ButtonText,
  banner1ButtonUrl,
  banner2Title,
  banner2ButtonText,
  banner2ButtonUrl,
  section1Title,
  portrait,
  videoTitle,
  videoUrl,
  bannersTitle,
  campaign,
  announcement,
  featuredBlogPostsTitle,
  featuredBlogPosts,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      headline={heroTitle}
      imageUrl="/static/images/hero/hero-talk.jpg"
      headlineMaxWidth="500px"
      headlinePlacement="bottom"
    />

    <PageSection>
      <StatList>
        {stats.map((stat, index) => (
          <StatView
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={String(index + 1)}
            sourceId={`home-stat-${index}`}
          />
        ))}
      </StatList>
    </PageSection>

    <Banner
      headline={banner1Title}
      buttonText={banner1ButtonText}
      buttonLink={banner1ButtonUrl}
    />

    {videoUrl && (
      <PageSection contained={false}>
        {videoTitle && (
          <Container>
            <h2>{videoTitle}</h2>
          </Container>
        )}
        <EmbeddedVideo videoUrl={videoUrl} />
      </PageSection>
    )}

    {campaign?.isActive && (
      <PageSection>
        <h2>{bannersTitle}</h2>

        <ExtendedBanner
          subHeadline={campaign.bannerSmallTitle}
          headline={campaign.introHeading}
          description={campaign.introMarkdown}
          image={campaign.imageList[0]?.file.url}
          buttonLink={pages.campaign}
          buttonText={campaign.bannerButtonText}
        />

        {announcement && (
          <Banner
            subHeadline={announcement.subHeading}
            headline={announcement.heading}
            description={announcement.description}
            image={announcement.image.file.url}
            buttonLink={announcement.buttonLink}
            buttonText={announcement.buttonText}
            showImageOnRight
          />
        )}
      </PageSection>
    )}

    <PageSection>
      <Container>
        <h2>{featuredBlogPostsTitle}</h2>
      </Container>

      <BlogPostList className="row">
        {featuredBlogPosts.map((post) => (
          <BlogPostListItem key={post.slug} className="col-md-4">
            <BlogPostCard post={post} />
          </BlogPostListItem>
        ))}
      </BlogPostList>
    </PageSection>

    {portrait && (
      <PageSection contained={false}>
        <Container>
          <h2>{section1Title}</h2>
        </Container>

        <StoryCarousel
          slides={[
            {
              imageUrl: portrait.page1Image.file.url,
              heading: portrait.page1Heading,
              text: portrait.page1Text,
            },
            {
              imageUrl: portrait.page2Image.file.url,
              heading: portrait.page2Heading,
              text: portrait.page2Text,
            },
            {
              imageUrl: portrait.page3Image.file.url,
              heading: portrait.page3Heading,
              text: portrait.page3Text,
            },
          ]}
        />
      </PageSection>
    )}

    <Banner
      headline={banner2Title}
      buttonText={banner2ButtonText}
      buttonLink={banner2ButtonUrl}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getHomeContent(locale)),
      featuredBlogPosts: await getNewestBlogPosts(3, locale),
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

export default Home
