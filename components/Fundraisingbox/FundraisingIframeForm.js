import React from 'react'
import PropTypes from 'prop-types'
import FundraisingboxLink from './FundraisingboxLink'
import PageSection from '../PageSection'
import SubHeader from './SubHeader'
import FundraisingIframe from './FundraisingIframe'
import FundraisingFormContainer from './FundraisingFormContainer'

const FundraisingIframeForm = ({
  fields,
  formTitle,
  hash,
  hiddenFields,
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
      {...hiddenFields}
    />
    <FundraisingFormContainer pullLeft={pullLeft}>
      <FundraisingboxLink />
    </FundraisingFormContainer>
  </PageSection>
)

FundraisingIframeForm.propTypes = {
  fields: PropTypes.shape(),
  formTitle: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  hiddenFields: PropTypes.shape().isRequired,
  onMouseHover: PropTypes.func.isRequired,
  pullLeft: PropTypes.bool,
}

FundraisingIframeForm.defaultProps = {
  fields: undefined,
  pullLeft: false,
}

export default FundraisingIframeForm
