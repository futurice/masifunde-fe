/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'

import Button from '../Button'
import { Link } from '../../routes'

const ExtendedButton = Button.extend`
  color: white !important;
  border: none;
  background-color: ${({ isActive }) => (isActive ? 'gray' : 'black')};
`

function NavigationLink({ children, router, href }) {
  return (
    <NavItem>
      <Link route={href} passHref>
        <ExtendedButton
          isActive={router.pathname === href}
          className="nav-link btn btn-primary"
        >
          {children}
        </ExtendedButton>
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
