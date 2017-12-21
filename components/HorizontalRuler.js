import styled from 'styled-components'

const HorizontalRuler = styled.hr`
  border-color: ${props => props.theme.orange};
  margin: 3.5rem 12%;
  
  @media (min-width: 576px) {
    margin: 4rem 22%;
  }
`

export default HorizontalRuler
