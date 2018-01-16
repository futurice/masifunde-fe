import React from 'react'
import PropTypes from 'prop-types'
import FundraisingboxLink from './FundraisingboxLink'
import PageSection from '../PageSection'
import SubHeader from './SubHeader'
import FundraisingIframe from './FundraisingIframe'
import FundraisingFormContainer from './FundraisingFormContainer'

const FundraisingIframeContainer = ({
  fields,
  formTitle,
  hash,
  onMouseHover,
  pullLeft,
}) => (
  <PageSection contained={false}>
    <FundraisingFormContainer pullLeft={pullLeft}>
      <SubHeader>{formTitle}</SubHeader>
    </FundraisingFormContainer>
    <FundraisingIframe
      onMouseHover={onMouseHover}
      hash={hash}
      {...fields}
    />
    <FundraisingFormContainer pullLeft={pullLeft}>
      <FundraisingboxLink />
    </FundraisingFormContainer>
  </PageSection>
)

FundraisingIframeContainer.propTypes = {
  fields: PropTypes.shape(),
  formTitle: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  onMouseHover: PropTypes.func.isRequired,
  pullLeft: PropTypes.bool,
}

FundraisingIframeContainer.defaultProps = {
  fields: undefined,
  pullLeft: false,
}

export default FundraisingIframeContainer
