import T from 'i18n-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import blogPostShape from '../../propTypes/blogPost'
import { RouteNames } from '../../routes'
import { extraSmallSpacing, smallSpacing } from '../../styling/sizes'
import { footerText } from '../../styling/typography'
import formatDate from '../../utils/date'
import Link from '../Link'

const Card = styled.a`
  background-color: ${({ theme }) => theme.orangeBackgroundMedium};
  color: inherit;
  text-decoration: none;
  transition: background-color .15s ease-in-out;

  display: flex;
  flex-direction: column;

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.orangeBackgroundDark};
    color: inherit;
    text-decoration: none;
  }
`

const ImageContainer = styled.div`
  background-color: ${({ theme }) => theme.orangeBackgroundDark};
  height: 200px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
`

const CardContent = styled.div`
  padding: ${smallSpacing};
`

const Metadata = styled.p`
  ${footerText};
  margin: 0;
`
const Title = styled.h6`
  font-size: 22px;
  font-weight: 800;
  margin: ${extraSmallSpacing} 0 0 0;
`

const TeaserText = styled.p`
  margin: ${smallSpacing} 0 0 0;
`

const ReadMore = styled.span`
  font-weight: 700;
  text-decoration: underline;
  white-space: pre-line;
`

const BlogPostCard = ({ post }) => (
  // ESLint seems to think that this link misses a href. It doesn't.
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <Link route={RouteNames.BlogPost} params={{ slug: post.slug }} passHref>
    <Card>
      <ImageContainer>
        {post.teaserImage && <Image src={post.teaserImage.url} />}
      </ImageContainer>
      <CardContent>
        <Metadata>
          {formatDate(post.date)}
        </Metadata>
        <Title>
          {post.title}
        </Title>
        {post.metaDescription &&
          <TeaserText>
            {post.metaDescription}
            <br />
            <ReadMore>{T.translate('blog.readMore')}</ReadMore>
          </TeaserText>
        }
      </CardContent>
    </Card>
  </Link>
)

BlogPostCard.propTypes = {
  post: PropTypes.shape(blogPostShape).isRequired,
}


export default BlogPostCard
