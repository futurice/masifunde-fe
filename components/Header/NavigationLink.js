/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'
import styled from 'styled-components'

import { Link } from '../../routes'

const StyledLink = styled.a`
  font-weight: bold;
  text-align: right;
  padding: 5px 0;
  margin-right: 2rem;
  margin-bottom: 3px;
  color: inherit !important;
  ${({ isActive }) => (isActive && 'border-bottom: 3px solid #FE9933 !important; margin-bottom: 0;')}
  
  @media screen and (max-width: 768px){
    text-align: center;
    margin-right: 0;
  }

  :hover {
    border-bottom: 3px solid #77695c; 
    margin-bottom: 0;
  }
`

function NavigationLink({ children, router, href }) {
  return (
    <NavItem>
      <Link route={href} passHref prefetch>
        <StyledLink className="nav-link" isActive={router.pathname.includes(href)}>
          {children}
        </StyledLink>
      </Link>
    </NavItem>
  )
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.any.isRequired,
}

export default withRouter(NavigationLink)
