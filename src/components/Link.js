/* eslint-disable react/forbid-prop-types */
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import useLocale from '../i18n/useLocale'
import { normalizeHref } from '../routes/utils'

const Link = ({ children, href, passHref, as }) => {
  const locale = useLocale()

  const hrefObject = normalizeHref(href)
  const queryWithLocale = { ...hrefObject.query, locale }
  const hrefWithLocale = { ...hrefObject, query: queryWithLocale }

  return (
    <NextLink href={hrefWithLocale} passHref={passHref} as={as}>
      {children}
    </NextLink>
  )
}

Link.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object,
    }),
  ]),
  passHref: PropTypes.bool,
  as: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

export default Link
