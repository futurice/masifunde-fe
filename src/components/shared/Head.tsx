import NextJsHead from 'next/head'
import { FC, ReactNode } from 'react'

export type Props = {
  title?: string
  description: string
  children?: ReactNode
}

const Head: FC<Props> = ({ title, description, children }) => (
  <NextJsHead>
    <title>{title ? `${title} - Masifunde` : 'Masifunde'}</title>
    {description && <meta name="description" content={description} />}
    {children}
  </NextJsHead>
)

export default Head
