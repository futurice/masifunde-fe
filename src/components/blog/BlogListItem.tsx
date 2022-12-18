import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import * as pages from '../../routes/pages'
import { mdBreakpoint } from '../../styling/breakpoints'
import { rem } from '../../styling/typography'
import { wordBreak } from '../../styling/utils'
import formatDate from '../../utils/formatDate'
import Link from '../shared/Link'

// Props
// =====

export type Props = {
  slug: string
  title: string
  date: string
  teaserImageUrl: string
  teaserText: string
  author?: string
}

// Helpers
// =======

const TeaserImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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
  line-height: ${rem('30px')};
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0.5rem;
  text-align: left;
  width: 100%;
  color: ${({ theme }) => theme.black};

  ${wordBreak}

  @media (min-width: ${mdBreakpoint}) {
    font-size: ${rem('32px')};
    line-height: ${rem('40px')};
  }
`

const Anchor = styled.a`
  width: 100%;
  :hover,
  :focus {
    color: ${({ theme }) => theme.black};
    text-decoration: underline;
  }
`

const TeaserImage = styled.img`
  width: 100%;
  max-width: 100%;
`

type BlogPostLinkProps = {
  slug: string
  children: ReactNode
}

const BlogPostLink: FC<BlogPostLinkProps> = ({ children, slug }) => (
  <Link href={{ pathname: pages.blogPost, query: { slug } }} passHref>
    <Anchor>{children}</Anchor>
  </Link>
)

// Component
// =========

const BlogListItem: FC<Props> = ({
  slug,
  title,
  date,
  teaserImageUrl,
  teaserText,
  author,
}) => (
  <li className="row">
    <TeaserImageContainer className="col-4">
      <BlogPostLink slug={slug}>
        <TeaserImage src={teaserImageUrl} alt="" />
      </BlogPostLink>
    </TeaserImageContainer>

    <div className="col-8">
      <div className="row">
        <DateAuthorText className="col">
          {formatDate(date)}
          {author && ` - ${author}`}
        </DateAuthorText>
      </div>

      <span className="row">
        <BlogPostLink slug={slug}>
          <BlogPostTitle className="col">{title}</BlogPostTitle>
        </BlogPostLink>
      </span>

      <span className="row">
        <TeaserText className="col">{teaserText}</TeaserText>
      </span>
    </div>
  </li>
)

export default BlogListItem
