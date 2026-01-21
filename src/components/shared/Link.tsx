import NextLink from 'next/link'
import { FC, ReactNode } from 'react'
import useLocale from '../../i18n/useLocale'
import { HrefObject, normalizeHref } from '../../routes/utils'

export type Props = {
  href: string | HrefObject
  children: ReactNode
  passHref?: boolean
  as?: string
}

const Link: FC<Props> = ({ children, href, passHref, as }) => {
  const locale = useLocale()

  const hrefObject = normalizeHref(href)
  const queryWithLocale = { ...hrefObject.query, locale }
  const hrefWithLocale = { ...hrefObject, query: queryWithLocale }

  return (
    <NextLink legacyBehavior href={hrefWithLocale} passHref={passHref} as={as}>
      {children}
    </NextLink>
  )
}

export default Link
