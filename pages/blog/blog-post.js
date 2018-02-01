import React from 'react'
import PropTypes from 'prop-types'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBlogPost } from '../../api/blog'
import PageSection from '../../components/PageSection'
import Markdown from '../../components/Markdown'
import TeamMember from '../../components/TeamMember'
import teamMemberShape from '../../propTypes/teamMember'
import imageShape from '../../propTypes/image'
import Hero from '../../components/Hero'

const BlogPostError = props => (
  <div>
    <Head title="FIXME: Oops" description="FIXME: Something went wrong" />
    <PageSection>
      <h1>FIXME: Oops</h1>
      <p className="offset-lg-1 col-lg-10">{props.error}</p>
    </PageSection>
  </div>
)

BlogPostError.propTypes = {
  error: PropTypes.string,
}

BlogPostError.defaultProps = {
  error: null,
}

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
    (<TeamMember
      className="col-md-3"
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
        <p>{date}</p>
      </PageSection>

      <PageSection>
        <h1>{title}</h1>
        <div className="row">
          <Markdown className="col-lg-12" source={content} />
        </div>
      </PageSection>

      <PageSection>
        {author}
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

