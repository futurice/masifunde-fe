import { FC } from 'react'
import styled from 'styled-components'
import { Container } from 'reactstrap'
import { GetStaticProps } from 'next'
import Head from '../../../../components/shared/Head'
import { getLayoutProps, LayoutPageProps } from '../../../../components/Layout'
import PageSection from '../../../../components/shared/PageSection'
import {
  BlogHomeContent,
  BlogPostListPage,
  getBlogHomeContent,
  getBlogPostListPage,
  getBlogPostPageCount,
} from '../../../../content/blog-content'
import { pageTitleWidth, rem } from '../../../../styling/typography'
import { lgBreakpoint } from '../../../../styling/breakpoints'
import Divider from '../../../../components/shared/Divider'
import BlogListItem from '../../../../components/blog/BlogListItem'
import BlogListNavigationButtons from '../../../../components/blog/BlogListNavigationButtons'

// Props & Params
// ==============

type Params = {
  locale: string
  page: string
}

type Props = LayoutPageProps & BlogHomeContent & BlogPostListPage

// Helpers
// =======

const BlogPostsList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin-left: auto;
  margin-right: auto;

  > * {
    margin-bottom: ${rem('70px')};
  }

  @media (min-width: ${lgBreakpoint}) {
    width: ${pageTitleWidth};
  }
`

const BlogPostsListHeading = styled.h1`
  text-align: left;
`

const BlogListFooter = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${lgBreakpoint}) {
    width: 60%;
  }
`

const Blog: FC<Props> = ({
  metaTitle,
  metaDescription,
  blogListTitle,
  previousPageButtonText,
  nextPageButtonText,
  page,
  totalNumberOfPages,
  blogPosts,
}) => {
  const isLastPage = page == totalNumberOfPages

  return (
    <div>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <BlogPostsListHeading>{blogListTitle}</BlogPostsListHeading>
        <BlogPostsList>
          {blogPosts.map((post) => (
            <BlogListItem
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              teaserImageUrl={post.teaserImage.file.url}
              teaserText={post.teaserText}
              author={post.authorTeamMember?.name ?? post.authorExternal}
            />
          ))}
        </BlogPostsList>
      </PageSection>

      <Container>
        <BlogListFooter>
          <Divider color="grey" size="large" />
          <BlogListNavigationButtons
            previousPageButtonText={previousPageButtonText}
            nextPageButtonText={nextPageButtonText}
            page={page}
            isLastPage={isLastPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </BlogListFooter>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale, page: pageString } = ctx.params!
  const page = parseInt(pageString, 10)
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getBlogHomeContent(locale)),
      ...(await getBlogPostListPage(page, locale)),
    },
  }
}

export async function getStaticPaths() {
  const pageCount = await getBlogPostPageCount()
  const paths = []

  for (let i = 1; i <= pageCount; i++) {
    const page = String(i)
    paths.push({ params: { page, locale: 'de' } })
    paths.push({ params: { page, locale: 'en' } })
  }

  return { paths, fallback: false }
}

export default Blog
