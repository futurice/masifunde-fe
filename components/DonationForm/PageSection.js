import styled from 'styled-components'
import PageSection from '../PageSection'

const DonationFormPageSection = styled(PageSection)`
  margin-top: 3rem;

  ${({ contained }) => contained && 'padding-right: 0;'}
`

DonationFormPageSection.propTypes = {
  ...PageSection.propTypes,
}

DonationFormPageSection.defaultProps = {
  ...PageSection.defaultProps,
}

export default DonationFormPageSection
