import styled from 'styled-components'
import { mdBreakpoint } from '../../styling/breakpoints'

const DonationFormLabel = styled.span`
  text-align: left;
  padding-right: 0;

  @media screen and (min-width: ${mdBreakpoint}){
    text-align: right;
  }

  @media (max-width: 767.99px){
    padding-top: 0;
    padding-bottom: 0;
  }
`

export default DonationFormLabel
