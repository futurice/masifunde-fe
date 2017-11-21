import React from 'react'
import NextJsHead from 'next/head'
import PropTypes from 'prop-types'

function createTitle(title) {
  if (title === '') {
    return 'Masifunde'
  }

  return `${title} - Masifunde`
}

const Head = ({ title, description }) => (
  <NextJsHead>
    <title>{createTitle(title)}</title>
    {/* If the content is undefined then it doesn't render the description */}
    <meta name="description" content={description} />
  </NextJsHead>)

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

Head.defaultProps = {
  description: undefined,
}

export default Head
