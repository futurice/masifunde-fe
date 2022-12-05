import { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container } from 'reactstrap'

import Head from '../../../../components/Head'
import { getLayoutProps } from '../../../../components/Layout'
import PageSection from '../../../../components/shared/PageSection'
import {
  fetchBlogLandingPage,
  fetchBlogPostPageCount,
} from '../../../../content/blog-content'
import { pageTitleWidth, rem } from '../../../../styling/typography'
import { lgBreakpoint } from '../../../../styling/breakpoints'
import Divider from '../../../../components/Divider'
import BlogListItem from '../../../../components/Blog/BlogListItem'
import BlogListNavigationButtons from '../../../../components/Blog/BlogListNavigationButtons'

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

class Blog extends Component {
  UNSAFE_componentWillReceiveProps(newProps, props) {
    if (newProps.page !== props.page) {
      this.resetFocus()
    }
  }

  resetFocus = () => document.activeElement.blur()

  render() {
    const {
      metaTitle,
      metaDescription,
      blogListTitle,
      blogPosts,
      previousPageButtonText,
      nextPageButtonText,
      page,
      isLastPage,
      totalNumberOfPages,
    } = this.props

    return (
      <div>
        <Head title={metaTitle} description={metaDescription} />

        <PageSection>
          <BlogPostsListHeading>{blogListTitle}</BlogPostsListHeading>
          <BlogPostsList>
            {blogPosts.map(({ id, ...rest }) => (
              <BlogListItem key={id} {...rest} />
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
}

Blog.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  blogListTitle: PropTypes.string.isRequired,
  ...BlogListNavigationButtons.propTypes,
  page: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  blogPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      ...BlogListItem.propTypes,
    })
  ),
}

Blog.defaultProps = {
  blogPosts: [],
}

export async function getStaticProps({ params: { locale, page } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchBlogLandingPage(locale, page)),
    },
  }
}

export async function getStaticPaths() {
  const pageCount = await fetchBlogPostPageCount()
  const paths = []

  for (let i = 1; i <= pageCount; i++) {
    const page = String(i)
    paths.push({ params: { page, locale: 'de' } })
    paths.push({ params: { page, locale: 'en' } })
  }

  return { paths, fallback: false }
}

export default Blog
