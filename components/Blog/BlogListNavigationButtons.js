/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../Button'
import Link from '../../components/Link'
import { RouteNames } from '../../routes'
import { smBreakpoint } from '../../styling/breakpoints'

const ButtonsContainer = styled.div`
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
    &:first-of-type, &:nth-of-type(3) {
      flex: 1;
      
      a {
        width: 100%;
      }
    }
    
    &:nth-of-type(2) {
      flex: 3;
    }
  }
`


const BlogListNavigationLink = ({ children, page }) => (
  <Link
    route={RouteNames.Blog}
    passHref
    params={{
      page,
    }}
  >
    {children}
  </Link>
)

BlogListNavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
}

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

const BlogListNavigationButtons = ({
  previousPageButtonText,
  nextPageButtonText,
  page,
  isLastPage,
}) => {
  const alterButtonIfLastPage = buttonPage => (isLastPage ? buttonPage - 1 : buttonPage)
  const isNotFirstPage = page > 1

  const firstPageButton = alterButtonIfLastPage(isNotFirstPage ? page - 1 : page)
  const secondPageButton = alterButtonIfLastPage(isNotFirstPage ? page : page + 1)
  const thirdPageButton = alterButtonIfLastPage(isNotFirstPage ? page + 1 : page + 2)

  return (
    <ButtonsContainer>
      <div>
        {
          isNotFirstPage && (
            <BlogListNavigationLink page={page - 1}>
              <Button>{previousPageButtonText}</Button>
            </BlogListNavigationLink>
          )
        }
      </div>
      <PageButtonsContainer>
        <BlogListNavigationLink page={firstPageButton}>
          <Button isActive={page === firstPageButton}>{firstPageButton}</Button>
        </BlogListNavigationLink>
        <BlogListNavigationLink page={secondPageButton}>
          <Button isActive={page === secondPageButton}>{secondPageButton}</Button>
        </BlogListNavigationLink>
        <BlogListNavigationLink page={thirdPageButton}>
          <Button isActive={page === thirdPageButton}>{thirdPageButton}</Button>
        </BlogListNavigationLink>
      </PageButtonsContainer>
      <div>
        {!isLastPage && (
          <BlogListNavigationLink page={page + 1}>
            <Button>{nextPageButtonText}</Button>
          </BlogListNavigationLink>
        )}
      </div>
    </ButtonsContainer>
  )
}

BlogListNavigationButtons.propTypes = {
  previousPageButtonText: PropTypes.string.isRequired,
  nextPageButtonText: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
}

export default BlogListNavigationButtons
