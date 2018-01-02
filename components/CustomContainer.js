import styled from 'styled-components'
import { Container } from 'reactstrap'

const CustomContainer = styled(Container)`
  @media (max-width: ${(props) => {
    switch (props.containAfter) {
      case 'xs':
        return '575.99px'
      case 'sm':
        return '767.99px'
      case 'md':
        return '991.99px'
      case 'lg':
        return '1199.99px'
      default:
        return '767.99px'
    }
  }}) {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
`

export default CustomContainer
