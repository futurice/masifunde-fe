import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

const Markdown = props => <ReactMarkdown {...props} softBreak="br" />

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Markdown
