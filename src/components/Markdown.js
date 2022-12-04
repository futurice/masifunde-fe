/* eslint-disable react/prop-types */
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

const Markdown = ({ source }) => (
  <ReactMarkdown softBreak="br" linkTarget="_blank">
    {source}
  </ReactMarkdown>
)

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Markdown
