import styled from 'styled-components'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing, smallSpacing } from '../../styling/sizes'

const StyledLink = styled.a`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  padding: 0.31rem 0;
  margin-right: ${extraSmallSpacing};

  color: inherit !important;
  margin-top: ${props => props.activeBorderThickness};

  margin-bottom: ${props => (
    props.isActive
      ? 0
      : `${props.activeBorderThickness}`
  )};

  border-bottom: ${props => (
    props.isActive
      ? `${props.activeBorderThickness} solid #FE9933 !important`
      : 0
  )};

  @media screen and (max-width: ${mdBreakpoint}){
    text-align: center;
    margin-right: 0;
  }

  @media (min-width: ${lgBreakpoint}) {
    margin-right: ${smallSpacing};
  }

  &:hover, &:focus {
    border-bottom: 3px solid ${({ theme }) => theme.pineCone};
    margin-bottom: 0;
  }
`

export default StyledLink
