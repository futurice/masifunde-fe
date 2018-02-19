import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { subsectionTitleText } from '../styling/typography'
import Divider from './Divider'
import PageSection from './PageSection'

const taglineTextMargin = '2.3rem'

const TaglineText = styled.p`
  ${subsectionTitleText};
  color: ${props => props.theme.orange};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${taglineTextMargin};
  margin-top: ${({ hideTopRuler }) => (hideTopRuler ? '0' : taglineTextMargin)};
`

const Tagline = ({ text, hideTopRuler, source }) => (
  <PageSection>
    {hideTopRuler ? null : <Divider color="orange" size="small" />}
    <TaglineText hideTopRuler={hideTopRuler}>
      {text}
      {source}
    </TaglineText>
    <Divider color="orange" size="large" />
  </PageSection>
)

Tagline.propTypes = {
  text: PropTypes.string.isRequired,
  hideTopRuler: PropTypes.bool,
  source: PropTypes.node,
}

Tagline.defaultProps = {
  hideTopRuler: false,
  source: null,
}

export default Tagline
