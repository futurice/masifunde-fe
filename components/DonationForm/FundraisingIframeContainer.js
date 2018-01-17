import React from 'react'
import PropTypes from 'prop-types'
import FundraisingboxLink from './FundraisingboxLink'
import PageSection from '../PageSection'
import SubHeader from './SubHeader'
import FundraisingIframe from './FundraisingIframe'
import FormContainer from './FormContainer'

const FundraisingIframeContainer = ({
  fields,
  formTitle,
  hash,
  onMouseHover,
}) => (
  <PageSection contained={false}>
    <FormContainer>
      <SubHeader>{formTitle}</SubHeader>
    </FormContainer>
    <FundraisingIframe
      onMouseHover={onMouseHover}
      hash={hash}
      {...fields}
    />
    <FormContainer>
      <FundraisingboxLink />
    </FormContainer>
  </PageSection>
)

FundraisingIframeContainer.propTypes = {
  fields: PropTypes.shape(),
  formTitle: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  onMouseHover: PropTypes.func.isRequired,
}

FundraisingIframeContainer.defaultProps = {
  fields: undefined,
}

export default FundraisingIframeContainer
