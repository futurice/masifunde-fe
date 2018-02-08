/* eslint-disable import/prefer-default-export,react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'next/router'
import { Link as NextLink } from '../routes'

const Link = ({
  children,
  router,
  params,
  ...rest
}) => (
  <NextLink {...rest} params={{ locale: router.query.locale, ...params }}>
    {children}
  </NextLink>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.shape(),
  router: PropTypes.any.isRequired,
}

Link.defaultProps = {
  params: {},
}

export default withRouter(Link)
