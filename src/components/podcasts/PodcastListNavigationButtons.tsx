import { FC } from 'react'
import styled from 'styled-components'
import * as pages from '../../routes/pages'
import { smBreakpoint } from '../../styling/breakpoints'
import { largeSpacing } from '../../styling/sizes'
import Button from '../Button'
import Link from '../Link'

// Props
// =====

export type Props = {
  previousPageButtonText: string
  nextPageButtonText: string
  page: number
  totalNumberOfPages: number
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

type PodcastListNavigationLinkProps = {
  destinationPage: number
  currentPage: number
  buttonText?: string
  rel?: 'prev' | 'next'
  rounded?: boolean
}

const PodcastListNavigationLink: FC<PodcastListNavigationLinkProps> = ({
  destinationPage,
  currentPage,
  buttonText,
  rel,
  rounded,
}) => (
  <Link
    href={{
      pathname: pages.podcast,
      query: { page: String(destinationPage) },
    }}
    passHref
  >
    <Button
      rel={rel}
      isActive={currentPage && currentPage === destinationPage}
      rounded={rounded}
    >
      {buttonText || destinationPage}
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

const PodcastListNavigationButtons: FC<Props> = ({
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
          <PodcastListNavigationLink
            rel="prev"
            destinationPage={page - 1}
            currentPage={page}
            buttonText={previousPageButtonText}
          />
        )}
      </div>

      <PageButtonsContainer>
        {moreThanOnePage && (
          <PodcastListNavigationLink
            currentPage={page}
            destinationPage={firstPageButton}
            rounded
          />
        )}
        <PodcastListNavigationLink
          currentPage={page}
          destinationPage={secondPageButton}
          rounded
        />
        {threeOrMorePages && (
          <PodcastListNavigationLink
            currentPage={page}
            destinationPage={thirdPageButton}
            rounded
          />
        )}
      </PageButtonsContainer>

      <div>
        {!isLastPage && (
          <PodcastListNavigationLink
            rel="next"
            destinationPage={page + 1}
            currentPage={page}
            buttonText={nextPageButtonText}
          />
        )}
      </div>
    </ButtonsContainer>
  )
}

export default PodcastListNavigationButtons
