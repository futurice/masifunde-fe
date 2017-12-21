import styled from 'styled-components'

const HorizontalRuler = styled.hr`
  border-color: ${props => props.theme.orange};
  margin: auto 12%;
  
  @media (min-width: 576px) {
    margin: auto 22%;
  }
`

export default HorizontalRuler
