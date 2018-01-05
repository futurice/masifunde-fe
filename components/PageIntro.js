import React from 'react'
import PropTypes from 'prop-types'

import IntroText from './IntroText'
import PageSection from './PageSection'

const PageIntro = ({ title, text, children }) => (
  <PageSection>
    <h1>{title}</h1>
    {text && <IntroText source={text} />}
    {children}
  </PageSection>
)

PageIntro.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  children: PropTypes.node,
}

PageIntro.defaultProps = {
  text: null,
  children: null,
}

export default PageIntro
