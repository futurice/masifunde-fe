import Button from '../../components/Button'

const LabelButton = Button.withComponent('label').extend`
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  
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
