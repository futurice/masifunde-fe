/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'
import styled from 'styled-components'

import { Link } from '../../routes'

const StyledLink = styled.a`
  color: black;
  text-align: right;
  ${({ isActive }) => (isActive && 'text-decoration: underline;')}
  
  @media screen and (min-width: 768px){
    text-align: left;
  }
`

function NavigationLink({ children, router, href }) {
  return (
    <NavItem>
      <Link route={href} passHref>
        <StyledLink className="nav-link" isActive={router.pathname === href}>
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
