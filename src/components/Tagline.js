import PropTypes from 'prop-types'
import styled from 'styled-components'

import { subsectionTitleText } from '../styling/typography'
import Divider from './Divider'
import PageSection from './shared/PageSection'

const taglineTextMargin = '2.3rem'

const TaglineText = styled.p`
  ${subsectionTitleText};
  color: ${(props) => props.theme.orange};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${taglineTextMargin};
  margin-top: ${({ hideTopRuler }) => (hideTopRuler ? '0' : taglineTextMargin)};
`

const Tagline = ({ text, hideTopRuler, source }) =>
  text && (
    <PageSection>
      {hideTopRuler ? null : <Divider color="orange" />}
      <TaglineText hideTopRuler={hideTopRuler}>
        {text}
        {source}
      </TaglineText>
      <Divider color="orange" />
    </PageSection>
  )

Tagline.propTypes = {
  text: PropTypes.string,
  hideTopRuler: PropTypes.bool,
  source: PropTypes.node,
}

Tagline.defaultProps = {
  hideTopRuler: false,
  source: null,
  text: null,
}

export default Tagline
