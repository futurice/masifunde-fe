/* eslint-disable react/prop-types */
import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

const Markdown = props => (
  <ReactMarkdown
    {...props}
    softBreak="br"
    renderers={{ Link: ({ href, children }) => <a href={href} target="_blank" rel="noopener">{children}</a> }}
  />
)

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Markdown
