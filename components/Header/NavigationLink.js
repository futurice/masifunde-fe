/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { NavItem } from 'reactstrap'
import { withRouter } from 'next/router'

import { Link } from '../../routes'
import StyledLink from './Link'
import Button from '../Button'

const activeLinkBorderThickness = '3px'

function NavigationLink({
  children,
  router,
  href,
  type,
}) {
  return (
    <NavItem>
      <Link route={href} passHref prefetch>
        {type === 'link'
          ? (
            <StyledLink
              activeBorderThickness={activeLinkBorderThickness}
              className="nav-link"
              isActive={router.pathname.includes(href)}
            >
              {children}
            </StyledLink>
          )
          : (
            <Button
              type="primary"
            >
              {children}
            </Button>
          )
        }
      </Link>
    </NavItem>
  )
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['link', 'button']),
}

NavigationLink.defaultProps = {
  type: 'link',
}

export default withRouter(NavigationLink)
