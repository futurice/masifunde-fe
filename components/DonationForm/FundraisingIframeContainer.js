import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FundraisingboxLink from './FundraisingboxLink'
import PageSection from './PageSection'
import SubHeader from './SubHeader'
import FundraisingIframe from './FundraisingIframe'
import FormContainer from './FormContainer'

const ScrollDiv = styled.div`
  position: relative;
  top: -${({ theme }) => theme.headerHeight};
`

const IFRAME_SCROLL_ID = 'iframe_scroll_anchor'

class FundraisingIframeContainer extends Component {
  componentWillReceiveProps = (newProps) => {
    if (newProps.scrollToIframe && !this.props.scrollToIframe) {
      window.location.hash = IFRAME_SCROLL_ID
    }
  }

  render() {
    const {
      fields,
      formTitle,
      scrollToIframe,
      ...rest
    } = this.props

    return (
      <PageSection contained={false}>
        {!scrollToIframe && (
          <FormContainer>
            <SubHeader>{formTitle}</SubHeader>
          </FormContainer>
        )}
        <ScrollDiv id={IFRAME_SCROLL_ID} />
        <FundraisingIframe
          {...fields}
          {...rest}
        />
        <FormContainer>
          <FundraisingboxLink />
        </FormContainer>
      </PageSection>
    )
  }
}

FundraisingIframeContainer.propTypes = {
  fields: PropTypes.shape(),
  formTitle: PropTypes.string.isRequired,
  scrollToIframe: PropTypes.bool.isRequired,
}

FundraisingIframeContainer.defaultProps = {
  fields: undefined,
}

export default FundraisingIframeContainer
