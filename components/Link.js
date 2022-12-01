/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { localizeHref, normalizeHref } from '../routes/utils'
import useLocale from '../i18n/useLocale'

const Link = ({ children, href, ...rest }) => {
  const locale = useLocale()

  const hrefObject = normalizeHref(href)
  const queryWithLocale = { ...hrefObject.query, locale }
  const hrefWithLocale = { ...hrefObject, query: queryWithLocale }

  const localizedPath = localizeHref(hrefWithLocale, locale)
  if (!localizedPath) {
    throw new Error('No localized path for:' + JSON.stringify(hrefWithLocale))
  }
  return (
    <NextLink
      {...rest}
      href={hrefWithLocale}
      as={localizeHref(hrefWithLocale, locale)}
    >
      {children}
    </NextLink>
  )
}

Link.propTypes = {
  href: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object,
    }),
  ]),
  children: PropTypes.node.isRequired,
}

Link.defaultProps = {
  params: {},
}

export default Link
