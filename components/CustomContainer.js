import styled from 'styled-components'
import { Container } from 'reactstrap'

const CustomContainer = styled(Container)`
  @media (max-width: 991.99px) {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
`

export default CustomContainer
