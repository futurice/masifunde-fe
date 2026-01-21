import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

export type Props = {
  source: string
  className?: string
}

const Markdown: FC<Props> = ({ source, className }) => (
  <div className={className}>
    <ReactMarkdown>{source}</ReactMarkdown>
  </div>
)

export default Markdown
