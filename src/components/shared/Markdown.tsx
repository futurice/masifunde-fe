import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

export type Props = {
  source: string
  className?: string
}

const Markdown: FC<Props> = ({ source, className }) => (
  <ReactMarkdown linkTarget="_blank" className={className}>
    {source}
  </ReactMarkdown>
)

export default Markdown
