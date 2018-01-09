import styled from 'styled-components'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import { smallSpacing } from '../../styling/sizes'

const StyledLink = styled.a`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  padding: 0.31rem 0;
  margin-right: ${smallSpacing};
  
  @media (min-width: ${lgBreakpoint}) {
    margin-right: 1.5rem;
  }
  color: inherit !important;
  margin-top: ${props => props.activeBorderThickness};
  margin-bottom: ${props => (props.isActive
    ? 0
    : `${props.activeBorderThickness}`)
};
  border-bottom: ${props => (props.isActive
    ? `${props.activeBorderThickness} solid #FE9933 !important`
    : 0)
};
  @media screen and (max-width: ${mdBreakpoint}){
    text-align: center;
    margin-right: 0;
  }

  :hover {
    border-bottom: 3px solid #77695c; 
    margin-bottom: 0;
  }
`

export default StyledLink
