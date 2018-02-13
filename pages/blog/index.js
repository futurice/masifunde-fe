/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container } from 'reactstrap'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import Link from '../../components/Link'
import imagePropShape from '../../propTypes/image'
import { RouteNames } from '../../routes'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogLandingPage } from '../../api/blog'
import { rem } from '../../styling/typography'
import Button from '../../components/Button'
import { lgBreakpoint, mdBreakpoint, smBreakpoint } from '../../styling/breakpoints'
import Divider from '../../components/Divider'

const TeaserImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  
  img {
    width: auto;
    max-width: 100%;
  }
`

const TeaserText = styled.span`
  color: ${({ theme }) => theme.pineCone};
  font-size: ${rem('16px')};
  
  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('20px')};
  }
`

const DateAuthorText = styled.span`
  font-size: 14px;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  
  @media (min-width: ${smBreakpoint}) {
    margin-top: 0;
  }
`

const BlogPostTitle = styled.h2`
  font-size: ${rem('24px')};
  line-height: ${rem('30px')};;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.black};
  
  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('32px')};
    line-height: ${rem('40px')};;
  }
`

const BlogListItem = ({
  author,
  title,
  date,
  teaserText,
  teaserImage,
  slug,
}) => {
  const BlogPostLink = ({ children }) => (
    <Link
      route={RouteNames.BlogPost}
      passHref
      params={{
        slug,
        previousPostRoute: '/FIXME: slug',
        nextPostRoute: '/FIXME: slug',
      }}
    >
      <a>
        {children}
      </a>
    </Link>
  )

  BlogPostLink.propTypes = { children: PropTypes.node.isRequired }

  return (
    <li className="row">
      <TeaserImageContainer className="col-12 col-sm-5">
        <BlogPostLink>
          <img src={teaserImage.url} alt="" />
        </BlogPostLink>
      </TeaserImageContainer>
      <div className="col-12 col-sm-7">
        <div className="row">
          <DateAuthorText className="col">{date} - {author}</DateAuthorText>
        </div>
        <span className="row">
          <BlogPostLink>
            <BlogPostTitle className="col">{title}</BlogPostTitle>
          </BlogPostLink>
        </span>
        <span className="row">
          <TeaserText className="col">{teaserText}</TeaserText>
        </span>
      </div>
    </li>
  )
}

BlogListItem.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  teaserText: PropTypes.string.isRequired,
  teaserImage: PropTypes.shape(imagePropShape).isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}

const BlogPostsList = styled.ol`
  list-style-type: none;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  
  > * {
    margin-bottom: ${rem('70px')};
  }  

  @media (min-width: ${lgBreakpoint}) {
    width: 70%;
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

const ButtonsContainer = styled.div`
  &, > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    
    @media (min-width: ${smBreakpoint}) {
      flex-direction: row;
      align-items: flex-start;
    }
  }
`

const Blog = ({
  metaTitle,
  metaDescription,
  blogListTitle,
  blogPosts,
  previousPageButtonText,
  nextPageButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <BlogPostsListHeading>{blogListTitle}</BlogPostsListHeading>
      <BlogPostsList>
        {blogPosts.map(({ id, ...rest }) => <BlogListItem key={id} {...rest} />)}
      </BlogPostsList>
    </PageSection>

    <Container>
      <BlogListFooter>
        <Divider />
        <ButtonsContainer>
          <Button>{previousPageButtonText}</Button>
          <div>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </div>
          <Button>{nextPageButtonText}</Button>
        </ButtonsContainer>
      </BlogListFooter>
    </Container>
  </div>
)

Blog.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  blogListTitle: PropTypes.string.isRequired,
  previousPageButtonText: PropTypes.string.isRequired,
  nextPageButtonText: PropTypes.string.isRequired,
  blogPosts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })),
}

Blog.defaultProps = {
  blogPosts: [],
}

Blog.getInitialProps = async function initialProps({ query }) {
  return fetchBlogLandingPage(getLocaleFromQuery(query))
}

export default withLayout(Blog)
