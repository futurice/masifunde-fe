import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

const StyledLink = styled.a`
  color: white !important;
  border: none;
  background-color: ${({ isActive }) => (isActive ? 'gray' : 'black')};
`

function NavigationLink({ children, router, href }) {
  return (
    <NavItem primary={false}>
      <Link href={href} passHref>
        <StyledLink
          isActive={router.pathname === href}
          className="nav-link btn btn-primary"
        >
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
