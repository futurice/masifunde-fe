import { GetStaticProps } from 'next'
import { FC } from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import styled from 'styled-components'
import Hero from '../../../components/Hero'
import { LayoutPageProps, getLayoutProps } from '../../../components/Layout'
import SocialLink from '../../../components/SocialLink'
import BlogPostNav from '../../../components/blog/BlogPostNav'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import PortraitPhoto from '../../../components/shared/PortraitPhoto'
import {
  BlogPost,
  StaticBlogPostContent,
  getAllBlogPostSlugs,
  getBlogPost,
  getNextBlogPostSlug,
  getPreviousBlogPostSlug as getPreviousBlogPostSlug,
  getStaticBlogPostContent,
} from '../../../content/blog-content'
import { TeamMember } from '../../../content/shared/team'
import {
  lgBreakpoint,
  mdBreakpoint,
  smBreakpoint,
} from '../../../styling/breakpoints'
import { smallSpacing } from '../../../styling/sizes'
import { footerText, rem } from '../../../styling/typography'
import formatDate from '../../../utils/formatDate'

// Props & Path Params
// ===================

type Params = {
  locale: string
  slug: string
}

type Props = LayoutPageProps &
  BlogPost &
  StaticBlogPostContent & {
    previousPostSlug: string | null
    nextPostSlug: string | null
  }

// Helpers
// =======

const BlogTitle = styled.h2`
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.black};
`

const BlogMarkdown = styled(Markdown)`
  p:first-child {
    font-size: ${rem('24px')};
  }

  p img {
    width: 100%;
  }

  @media (min-width: ${smBreakpoint}) {
    p img {
      margin: 0 -25px;
      width: calc(100% + 50px);
    }
  }

  @media (min-width: ${mdBreakpoint}) {
    p img {
      margin: 0 -30px;
      width: calc(100% + 60px);
    }
  }

  @media (min-width: ${lgBreakpoint}) {
    p img {
      margin: 0 -120px;
      width: calc(100% + 240px);
    }
  }
`

const AuthorPortraitPhoto = styled(PortraitPhoto)`
  justify-content: flex-start;
`

const DateContainer = styled.div`
  margin-bottom: ${smallSpacing};

  p {
    ${footerText}
  }
`

const AuthorContainer = styled.div`
  margin-top: ${smallSpacing};
`

const H4 = styled.h4`
  text-align: left;
`

const ShareContainer = styled.div`
  > * {
    text-align: right;
  }

  margin-top: ${smallSpacing};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const shareButtonSpacing = '10px'
const ShareButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${shareButtonSpacing};
`

const SocialShareLink = styled(SocialLink.withComponent('div'))`
  margin: 0;
`

type AuthorSectionProps = {
  authorTeamMember?: TeamMember
  authorExternal?: string
  authorText?: string
}

const AuthorSection: FC<AuthorSectionProps> = ({
  authorTeamMember,
  authorExternal,
  authorText,
}) => (
  <AuthorContainer className="col-6">
    {/* Heading */}
    {authorTeamMember || authorExternal ? <H4>{authorText}</H4> : ''}

    {/* Content */}
    {authorTeamMember ? (
      <AuthorPortraitPhoto
        imageUrl={authorTeamMember.profileImage?.file.url ?? ''}
        title={authorTeamMember.name}
        subtitle={authorTeamMember.responsibilityArea}
        email={authorTeamMember.email}
      />
    ) : authorExternal ? (
      <p>{authorExternal}</p>
    ) : null}
  </AuthorContainer>
)

// Component
// =========

const BlogPostPage: FC<Props> = ({
  title,
  slug,
  metaDescription,
  date,
  heroImage,
  content,
  authorTeamMember,
  authorExternal,
  authorText,
  shareText,
  blogHomeText,
  previousPostText,
  nextPostText,
  previousPostSlug,
  nextPostSlug,
}) => {
  const pageUrl = `https://www.masifunde.de/blog/${slug}`

  return (
    <div>
      <div>
        <Head title={title} description={metaDescription} />

        {heroImage && (
          <Hero
            heroSize="small"
            backgroundPositionX="70%"
            imageUrl={heroImage.file.url}
          />
        )}

        <PageSection>
          <div className="row">
            <div className="offset-lg-2 col-lg-8">
              <DateContainer>
                <p>{formatDate(date)}</p>
              </DateContainer>

              <BlogTitle>{title}</BlogTitle>
              <BlogMarkdown source={content} />

              <div className="row">
                <AuthorSection
                  authorTeamMember={authorTeamMember}
                  authorExternal={authorExternal}
                  authorText={authorText}
                />

                <ShareContainer className="col-6">
                  <H4>{shareText}</H4>
                  <ShareButtonRow>
                    <FacebookShareButton url={pageUrl} quote="">
                      <SocialShareLink>
                        <FaFacebook size={24} />
                      </SocialShareLink>
                    </FacebookShareButton>
                    <TwitterShareButton url={pageUrl} title="">
                      <SocialShareLink>
                        <FaTwitter size={24} />
                      </SocialShareLink>
                    </TwitterShareButton>
                  </ShareButtonRow>
                </ShareContainer>
              </div>
            </div>
          </div>
        </PageSection>
      </div>

      <BlogPostNav
        previousPostSlug={previousPostSlug ?? undefined}
        nextPostSlug={nextPostSlug ?? undefined}
        blogHomeText={blogHomeText}
        previousPostText={previousPostText}
        nextPostText={nextPostText}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale, slug } = ctx.params!

  const post = await getBlogPost(slug, locale)
  const previousPostSlug = await getPreviousBlogPostSlug(post.date, locale)
  const nextPostSlug = await getNextBlogPostSlug(post.date, locale)

  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getStaticBlogPostContent(locale)),
      ...post,
      previousPostSlug: previousPostSlug ?? null,
      nextPostSlug: nextPostSlug ?? null,
    },
  }
}

export async function getStaticPaths() {
  const slugs = await getAllBlogPostSlugs()
  const paths = []

  for (const slug of slugs) {
    paths.push({
      params: {
        locale: 'de',
        slug: slug.de,
      },
    })
    if (slug.en)
      paths.push({
        params: {
          locale: 'en',
          slug: slug.en,
        },
      })
  }

  return { paths, fallback: false }
}

export default BlogPostPage
