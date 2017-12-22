import styled from 'styled-components'

const StyledLink = styled.a`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  padding: 0.31rem 0;
  margin-right: 2rem;
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
  @media screen and (max-width: 768px){
    text-align: center;
    margin-right: 0;
  }

  :hover {
    border-bottom: 3px solid #77695c; 
    margin-bottom: 0;
  }
`

export default StyledLink
