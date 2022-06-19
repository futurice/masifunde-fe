import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FundraisingboxLink from './FundraisingboxLink'
import PageSection from './PageSection'
import SubHeader from './SubHeader'
import FundraisingIframe from './FundraisingIframe'
import FormContainer from './FormContainer'

/**
 * When scrolling directly to the iframe the top part of the iframe gets
 * hidden behind the fixed header. Scrolling to "ScrollDiv" which is placed
 * further up on the page will display the entire iframe.
 */
const ScrollDiv = styled.div`
  position: relative;
  top: -${({ theme }) => theme.headerHeight};
`

const IFRAME_SCROLL_ID = 'iframe_scroll_anchor'

function FundraisingIframeContainer({
  fields,
  formTitle,
  scrollToIframe,
  ...rest
}) {
  useEffect(() => {
    if (scrollToIframe) {
      window.location.hash = IFRAME_SCROLL_ID
    }
  }, [scrollToIframe])

  return (
    <PageSection contained={false}>
      {!scrollToIframe && (
        <FormContainer>
          <SubHeader>{formTitle}</SubHeader>
        </FormContainer>
      )}
      <ScrollDiv id={IFRAME_SCROLL_ID} />
      <FundraisingIframe {...fields} {...rest} />
      <FormContainer>
        <FundraisingboxLink />
      </FormContainer>
    </PageSection>
  )
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
