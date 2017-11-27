/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'

import Button from '../Button'
import { Link } from '../../routes'

function NavigationLink({ children, router, href }) {
  return (
    <NavItem>
      <Link route={href} passHref prefetch>
        <Button
          type="primary"
          isActive={router.pathname === href}
        >
          {children}
        </Button>
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
