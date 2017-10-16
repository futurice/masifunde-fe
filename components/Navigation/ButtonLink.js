import React from 'react'
import PropTypes from 'prop-types'
import { NavItem, NavLink } from 'reactstrap'
import { withRouter } from 'next/router'
import Link from 'next/link'

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
}

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'gray',
}

function NavigationLink({ children, router, href }) {
  let style

  if (router.pathname === href) {
    style = activeButtonStyle
  } else {
    style = buttonStyle
  }

  return (
    <NavItem>
      <Link href={href} passHref>
        <NavLink className="btn btn-primary" style={style}>
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
