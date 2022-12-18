import { FC } from 'react'
import styled from 'styled-components'
import * as pages from '../../routes/pages'
import { smBreakpoint } from '../../styling/breakpoints'
import { largeSpacing } from '../../styling/sizes'
import Link from '../Link'
import Button from '../shared/Button'
import Divider from '../shared/Divider'

export type Props = {
  previousPostSlug?: string
  nextPostSlug?: string
  blogHomeText: string
  previousPostText: string
  nextPostText: string
}

// BlogPostNav

const DividerWithMargin = styled(Divider)`
  margin: ${largeSpacing} 0;
`

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .longNavText {
    display: none;
  }
  .shortNavText {
    display: inline;
  }

  @media (min-width: ${smBreakpoint}) {
    .longNavText {
      display: inline;
    }
    .shortNavText {
      display: none;
    }
  }
`

const NavButton = styled(Button)`
  visibility: ${(props) => (props.href ? 'visible' : 'hidden')};
`

// Component
// =========

const BlogPostNav: FC<Props> = ({
  previousPostSlug,
  previousPostText,
  nextPostSlug,
  nextPostText,
  blogHomeText,
}) => (
  <div className="container">
    <div className="row">
      <div className="offset-lg-2 col-lg-8">
        <DividerWithMargin />
        <NavContainer>
          {previousPostSlug && (
            <Link
              href={{
                pathname: pages.blogPost,
                query: { slug: previousPostSlug },
              }}
              passHref
            >
              <NavButton variant="secondary">
                <span className="longNavText">{previousPostText}</span>
                <span className="shortNavText">{'<'}</span>
              </NavButton>
            </Link>
          )}

          <Link
            href={{
              pathname: pages.blog,
              query: { page: '1' },
            }}
            passHref
          >
            <NavButton variant="secondary">{blogHomeText}</NavButton>
          </Link>

          {nextPostSlug && (
            <Link
              href={{
                pathname: pages.blogPost,
                query: { slug: nextPostSlug },
              }}
              passHref
            >
              <NavButton variant="secondary">
                <span className="longNavText">{nextPostText}</span>
                <span className="shortNavText">{'>'}</span>
              </NavButton>
            </Link>
          )}
        </NavContainer>
      </div>
    </div>
  </div>
)

export default BlogPostNav
