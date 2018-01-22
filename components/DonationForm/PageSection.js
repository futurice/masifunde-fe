import styled from 'styled-components'
import PageSection from '../PageSection'

const DonationFormPageSection = styled(PageSection)`
  margin-top: 3rem;
  
  // Excplicitly checking false instead of falsy to not add the rule if 'contained' is undefined
  ${({ contained }) => contained !== false && 'padding-right: 0;'}
`

export default DonationFormPageSection
