import PropTypes from 'prop-types'
import { useEffect } from 'react'
import styled from 'styled-components'
import FormContainer from './FormContainer'
import FundraisingIframe from './FundraisingIframe'
import FundraisingboxLink from './FundraisingboxLink'
import PageSection from './PageSection'
import SubHeader from './SubHeader'

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
