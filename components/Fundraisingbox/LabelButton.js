import Button from '../../components/Button'
import { rem } from '../../styling/typography'

const LabelButton = Button.withComponent('label').extend`
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
  font-size: ${rem('18px')};
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  &:last-child {
    margin-right: 0;
  }

  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

export default LabelButton
