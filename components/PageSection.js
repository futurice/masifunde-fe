import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'
import styled from 'styled-components'

const sectionSpacing = '5rem'

const ContainedPageSection = styled(Container)`
  margin-top: ${sectionSpacing};
`

const UncontainedPageSection = styled.div`
  margin-top: ${sectionSpacing};
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
