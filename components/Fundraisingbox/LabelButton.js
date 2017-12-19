import Button from '../../components/Button'

const LabelButton = Button.withComponent('label').extend`
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
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
