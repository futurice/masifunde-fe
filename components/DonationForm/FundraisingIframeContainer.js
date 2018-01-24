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
  ...rest
}) => (
  <PageSection contained={false}>
    <FormContainer>
      <SubHeader>{formTitle}</SubHeader>
    </FormContainer>
    <FundraisingIframe
      {...fields}
      {...rest}
    />
    <FormContainer>
      <FundraisingboxLink />
    </FormContainer>
  </PageSection>
)

FundraisingIframeContainer.propTypes = {
  fields: PropTypes.shape(),
  formTitle: PropTypes.string.isRequired,
}

FundraisingIframeContainer.defaultProps = {
  fields: undefined,
}

export default FundraisingIframeContainer
