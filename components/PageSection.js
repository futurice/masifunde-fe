import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled, { css } from 'styled-components'
import { smBreakpoint } from '../styling/breakpoints'

const sectionSpacing = '5rem'
const sectionSpacingMobile = '4rem'

const pageSectionStyle = css`
  margin-top: ${sectionSpacingMobile};
  
  @media (min-width: ${smBreakpoint}) {
    margin-top: ${sectionSpacing};
  }
`

const ContainedPageSection = styled(Container)`
  ${pageSectionStyle}
`

const UncontainedPageSection = styled.div`
  ${pageSectionStyle}
`

const PageSection = ({ children, className, contained }) => (
  contained
    ? <ContainedPageSection className={className}>{children}</ContainedPageSection>
    : <UncontainedPageSection className={className}>{children}</UncontainedPageSection>
)

PageSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contained: PropTypes.bool,
}

PageSection.defaultProps = {
  className: '',
  contained: true,
}

export default PageSection
