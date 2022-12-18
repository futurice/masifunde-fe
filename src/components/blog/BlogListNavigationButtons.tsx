import { FC } from 'react'
import styled from 'styled-components'
import * as pages from '../../routes/pages'
import { smBreakpoint } from '../../styling/breakpoints'
import { largeSpacing } from '../../styling/sizes'
import Link from '../Link'
import Button from '../shared/Button'

// Props
// =====

export type Props = {
  previousPageButtonText: string
  nextPageButtonText: string
  page: number
  totalNumberOfPages: number
  isLastPage: boolean
}

// Helpers
// =======

const ButtonsContainer = styled.nav`
  margin-top: ${largeSpacing};

  & {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;

    @media (min-width: ${smBreakpoint}) {
      align-items: flex-start;
    }
  }

  > div {
    &:first-of-type,
    &:nth-of-type(3) {
      flex-grow: 1;

      a {
        width: 100%;
      }
    }

    &:nth-of-type(2) {
      flex-grow: 3;
    }
  }
`

type BlogListNavigationLinkProps = {
  page: number
  buttonText?: string
  currentPage?: number
  rel?: string
  rounded?: boolean
}

const BlogListNavigationLink: FC<BlogListNavigationLinkProps> = ({
  buttonText,
  currentPage,
  page,
  rel,
  rounded = false,
}) => (
  <Link
    href={{
      pathname: pages.blog,
      query: { page },
    }}
    passHref
  >
    <Button rel={rel} isActive={currentPage === page} rounded={rounded}>
      {buttonText || page}
    </Button>
  </Link>
)

const PageButtonsContainer = styled.div`
  display: flex;
  justify-content: center;

  > * {
    display: none;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    @media (min-width: ${smBreakpoint}) {
      display: block;
    }
  }
`

// Component
// =========

const BlogListNavigationButtons: FC<Props> = ({
  previousPageButtonText,
  nextPageButtonText,
  page,
  totalNumberOfPages,
}) => {
  const isFirstPage = page === 1
  const isLastPage = page === totalNumberOfPages
  const moreThanOnePage = totalNumberOfPages !== 1
  const threeOrMorePages = totalNumberOfPages >= 3

  let firstPageButton = page - 1
  let secondPageButton = page
  let thirdPageButton = page + 1

  if (isFirstPage) {
    firstPageButton += 1
    secondPageButton += 1
    thirdPageButton += 1
  }

  if (isLastPage) {
    firstPageButton -= 1
    secondPageButton -= 1
    thirdPageButton -= 1
  }

  return (
    <ButtonsContainer>
      <div>
        {!isFirstPage && (
          <BlogListNavigationLink
            rel="prev"
            page={page - 1}
            buttonText={previousPageButtonText}
          />
        )}
      </div>

      <PageButtonsContainer>
        {moreThanOnePage && (
          <BlogListNavigationLink
            currentPage={page}
            page={firstPageButton}
            rounded
          />
        )}
        <BlogListNavigationLink
          currentPage={page}
          page={secondPageButton}
          rounded
        />
        {threeOrMorePages && (
          <BlogListNavigationLink
            currentPage={page}
            page={thirdPageButton}
            rounded
          />
        )}
      </PageButtonsContainer>

      <div>
        {!isLastPage && (
          <BlogListNavigationLink
            rel="next"
            page={page + 1}
            buttonText={nextPageButtonText}
          />
        )}
      </div>
    </ButtonsContainer>
  )
}

export default BlogListNavigationButtons
