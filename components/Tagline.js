import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { subsectionTitleText } from '../styling/typography'
import HorizontalRuler from './HorizontalRuler'
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
    {hideTopRuler ? null : <HorizontalRuler />}
    <TaglineText hideTopRuler={hideTopRuler}>
      {text}
      {source}
    </TaglineText>
    <HorizontalRuler />
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
