import React from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink } from 'reactstrap'
import { withRouter } from 'next/router'
import Link from 'next/link'

const linkStyle = {
  color: 'black',
}

const activeLinkStyle = {
  ...linkStyle,
  textDecoration: 'underline',
}

function NavigationLink({ children, router, href }) {
  let style

  if (router.pathname === href) {
    style = activeLinkStyle
  } else {
    style = linkStyle
  }

  return (
    <NavItem>
      <Link href={href} passHref>
        <NavLink
          style={style}
        >
          {children}
        </NavLink>
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
