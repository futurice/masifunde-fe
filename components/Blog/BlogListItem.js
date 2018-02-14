/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import imagePropShape from '../../propTypes/image'
import { mdBreakpoint } from '../../styling/breakpoints'
import { rem } from '../../styling/typography'
import { RouteNames } from '../../routes'
import Link from '../../components/Link'

const TeaserImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  
  > a {
    width: 100%;
    
    img {
      width: 100%;
      max-width: 100%;
    }
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
  
  hyphens: auto;
  word-break: break-all;
  word-break: break-word;
  overflow-wrap: break-word;
  word-wrap: break-word;
  
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
      <TeaserImageContainer className="col-4">
        <BlogPostLink>
          <img src={teaserImage.url} alt="" />
        </BlogPostLink>
      </TeaserImageContainer>
      <div className="col-8">
        <div className="row">
          <DateAuthorText className="col">
            {date}
            {author ? ' - ' : null}
            {author}
          </DateAuthorText>
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
  title: PropTypes.string.isRequired,
  teaserImage: PropTypes.shape(imagePropShape).isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  author: PropTypes.string,
  teaserText: PropTypes.string,
}

BlogListItem.defaultProps = {
  author: '',
  teaserText: '',
}

export default BlogListItem
