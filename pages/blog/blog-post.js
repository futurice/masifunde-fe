import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogPost } from '../../api/blog'
import PageSection from '../../components/PageSection'
import TeamMember from '../../components/TeamMember'
import teamMemberShape from '../../propTypes/teamMember'
import imageShape from '../../propTypes/image'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../../styling/breakpoints'
import theme from '../../styling/theme'
import { rem } from '../../styling/typography'

const BlogPostError = props => (
  <div>
    <Head title="FIXME: Oops" description="FIXME: Something went wrong" />
    <PageSection>
      <h1>FIXME: Oops</h1>
      <p className="offset-lg-2 col-lg-8">{props.error}</p>
    </PageSection>
  </div>
)

BlogPostError.propTypes = {
  error: PropTypes.string,
}

BlogPostError.defaultProps = {
  error: null,
}

const BlogTitle = styled.h2`
  margin-left: 0;
  margin-right: 0;
  text-align: left;
  width: 100%;
  color: ${theme.black};
`

const BlogMarkdown = styled(Markdown)`
  p:first-child {
    font-size: ${rem('24px')}
  }

  p img {
    width: 100%;
  }

  @media(min-width:${smBreakpoint}) {
    p img {
      margin: 0 -25px;
      width: calc(100% + 50px);
    }
  }

  @media(min-width:${mdBreakpoint}) {
    p img {
      margin: 0 -30px;
      width: calc(100% + 60px);
    }
  }

  @media(min-width:${lgBreakpoint}) {
    p img {
      margin: 0 -120px;
      width: calc(100% + 240px);
    }
  }
`

const TeamMemberAuthor = styled(TeamMember)`
  justify-content: flex-start;
`

const DateContainer = styled.div`
  margin-bottom: 1.5rem;
`

const AuthorContainer = styled.div`
  margin-top: 1.5rem;
`

const BlogPostContent = (props) => {
  const {
    title,
    metaDescription,
    date,
    heroImage,
    content,
    authorTeamMember,
    authorExternal,
  } = props

  const author = authorTeamMember ?
    (<TeamMemberAuthor
      imageUrl={authorTeamMember.image.url}
      title={authorTeamMember.name}
      subtitle={authorTeamMember.responsibilityArea}
      email={authorTeamMember.email}
    />) :
    <p>{authorExternal}</p>

  return (
    <div>
      <Head title={title} description={metaDescription} />

      {heroImage && <Hero
        heroSize="small"
        backgroundPositionX="70%"
        imageUrl={heroImage.url}
      />}

      <PageSection>
        <div className="offset-lg-2 col-lg-8">
          <DateContainer>
            <h5>{date}</h5>
          </DateContainer>
          <BlogTitle>{title}</BlogTitle>
          <BlogMarkdown source={content} />
          <AuthorContainer>
            <h4>Author</h4>
            {author}
          </AuthorContainer>
        </div>
      </PageSection>

    </div>
  )
}

BlogPostContent.propTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
  metaDescription: PropTypes.string,
  date: PropTypes.string,
  heroImage: PropTypes.shape(imageShape),
  content: PropTypes.string,
  authorTeamMember: PropTypes.shape(teamMemberShape),
  authorExternal: PropTypes.string,
}

BlogPostContent.defaultProps = {
  title: '',
  slug: '',
  metaDescription: '',
  date: '',
  heroImage: null,
  content: '',
  authorTeamMember: null,
  authorExternal: '',
}

const BlogPost = props => (
  props.error ? BlogPostError(props) : BlogPostContent(props)
)

BlogPost.propTypes = {
  ...BlogPostContent.propTypes,
  ...BlogPostError.propTypes,
}

BlogPost.defaultProps = {
  ...BlogPostContent.defaultProps,
  ...BlogPostError.defaultProps,
}

BlogPost.getInitialProps = async function initialProps({ query }) {
  return fetchBlogPost(getLocaleFromQuery(query), query.slug)
    .catch((error) => {
      if (error.id === 'POST_NOT_FOUND') {
        return { error: error.toString() }
      }
      throw error
    })
}

export default withLayout(BlogPost)

