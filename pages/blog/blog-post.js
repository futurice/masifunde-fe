/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  TwitterShareButton,
  FacebookShareButton,
} from 'react-share'
import FaFacebook from 'react-icons/lib/fa/facebook'
import FaTwitter from 'react-icons/lib/fa/twitter'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogPost, fetchBlogPostPage } from '../../api/blog'
import PageSection from '../../components/PageSection'
import TeamMember from '../../components/TeamMember'
import teamMemberShape from '../../propTypes/teamMember'
import imageShape from '../../propTypes/image'
import Hero from '../../components/Hero'
import Markdown from '../../components/Markdown'
import { smBreakpoint, mdBreakpoint, lgBreakpoint } from '../../styling/breakpoints'
import theme from '../../styling/theme'
import { rem, footerText } from '../../styling/typography'
import Button from '../../components/Button'
import Link from '../../components/Link'
import { RouteNames as routes } from '../../routes'
import { smallSpacing, largeSpacing } from '../../styling/sizes'
import SocialLink from '../../components/SocialLink'

const BlogPostError = ({ error }) => (
  <div>
    <Head title="FIXME: Oops" description="FIXME: Something went wrong" />
    <PageSection>
      <h1>FIXME: Oops</h1>
      <p className="offset-lg-2 col-lg-8">{error}</p>
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

  @media(min-width: ${smBreakpoint}) {
    p img {
      margin: 0 -25px;
      width: calc(100% + 50px);
    }
  }

  @media(min-width: ${mdBreakpoint}) {
    p img {
      margin: 0 -30px;
      width: calc(100% + 60px);
    }
  }

  @media(min-width: ${lgBreakpoint}) {
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
  margin-top: -${shareButtonSpacing};

  > * {
    padding: ${shareButtonSpacing};
  }

  > :last-child {
    margin-right: -${shareButtonSpacing};
  }
`

const SocialShareLink = SocialLink.withComponent('div').extend`
  margin: 0;
`

const HorizontalRule = styled.hr`
  border-width: 2px;
  border-color: ${props => props.theme.pineCone};
  margin-top: ${largeSpacing};
`

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const BlogPostContent = ({
  title,
  metaDescription,
  date,
  heroImage,
  content,
  authorTeamMember,
  authorExternal,
  authorText,
  shareText,
  url,
}) => {
  const author = authorTeamMember
    ? (
      <TeamMemberAuthor
        imageUrl={authorTeamMember.image.url}
        title={authorTeamMember.name}
        subtitle={authorTeamMember.responsibilityArea}
        email={authorTeamMember.email}
      />
    )
    : <p>{authorExternal}</p>

  const pageUrl = `https://www.masifunde.de/${url.asPath}`
  const shareMessage = ''
  const shareIconSize = 24

  return (
    <div>
      <Head title={title} description={metaDescription} />

      {heroImage &&
        <Hero
          heroSize="small"
          backgroundPositionX="70%"
          imageUrl={heroImage.url}
        />
      }

      <PageSection>
        <div className="offset-lg-2 col-lg-8">
          <DateContainer>
            <p>{date}</p>
          </DateContainer>
          <BlogTitle>{title}</BlogTitle>
          <BlogMarkdown source={content} />
          <div className="row">
            <AuthorContainer className="col-6">
              <H4>{authorText}</H4>
              {author}
            </AuthorContainer>
            <ShareContainer className="col-6">
              <H4>{shareText}</H4>

              <ShareButtonRow>
                <FacebookShareButton
                  url={pageUrl}
                  quote={shareMessage}
                >
                  <SocialShareLink>
                    <FaFacebook size={shareIconSize} />
                  </SocialShareLink>
                </FacebookShareButton>

                <TwitterShareButton
                  url={pageUrl}
                  title={shareMessage}
                >
                  <SocialShareLink>
                    <FaTwitter size={shareIconSize} />
                  </SocialShareLink>
                </TwitterShareButton>
              </ShareButtonRow>

            </ShareContainer>
          </div>

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

const BlogPost = (props) => {
  const {
    error,
    previousPostRoute,
    previousPostText,
    nextPostRoute,
    nextPostText,
    blogHomeText,
  } = props

  return error
    ? <BlogPostError {...props} />
    : (
      <div>
        <BlogPostContent {...props} />

        <PageSection>
          <div className="offset-lg-2 col-lg-8">
            <HorizontalRule />

            <NavContainer>
              <Link route={previousPostRoute} passHref>
                <Button type="secondary">{previousPostText}</Button>
              </Link>
              <Link route={routes.Blog} passHref>
                <Button type="secondary">{blogHomeText}</Button>
              </Link>
              <Link route={nextPostRoute} passHref>
                <Button type="secondary">{nextPostText}</Button>
              </Link>
            </NavContainer>
          </div>
        </PageSection>
      </div>
    )
}

BlogPost.propTypes = {
  ...BlogPostContent.propTypes,
  ...BlogPostError.propTypes,
  previousPostRoute: PropTypes.string,
  nextPostRoute: PropTypes.string,
}

BlogPost.defaultProps = {
  ...BlogPostContent.defaultProps,
  ...BlogPostError.defaultProps,
}

BlogPost.getInitialProps = async function initialProps({ query }) {
  return Promise.all([
    fetchBlogPostPage(getLocaleFromQuery(query)),
    fetchBlogPost(getLocaleFromQuery(query), query.slug)
      .catch((error) => {
        if (error.id === 'POST_NOT_FOUND') {
          return { error: error.toString() }
        }
        throw error
      }),
  ])
    .then((results) => {
      const page = results[0]
      const post = results[1]
      return { ...page, ...post }
    })
}

export default withLayout(BlogPost)

