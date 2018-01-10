import { css } from 'styled-components'
import Button from '../../components/Button'
import { rem } from '../../styling/typography'

const LabelButton = Button.withComponent('label').extend`
  margin-bottom: 0.8rem;
  font-size: ${rem('18px')};
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  width: 100%;
  color: ${({ theme }) => theme.black};
  border-radius: 8px;
  border: solid 2px rgba(179, 170, 161, 0.6);

  &:hover, &:focus {
    border: solid 2px ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.black};
    background-color: transparent;
  }

  ${props => props.isActive && css`
    color: white;
    border: solid 2px ${({ theme }) => theme.orange};
    background-color: ${({ theme }) => theme.orange};
    
    &:hover, &:focus {
      background-color: ${({ theme }) => theme.orange};
      color: white;
    }
  `}

  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

export default LabelButton
