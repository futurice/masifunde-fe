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

const PageSection = ({ children, contained, ...rest }) => (
  contained
    ? <ContainedPageSection {...rest}>{children}</ContainedPageSection>
    : <UncontainedPageSection {...rest}>{children}</UncontainedPageSection>
)

PageSection.propTypes = {
  children: PropTypes.node.isRequired,
  contained: PropTypes.bool,
}

PageSection.defaultProps = {
  contained: true,
}

export default PageSection
