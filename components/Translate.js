import { Component } from 'react'
import PropTypes from 'prop-types'

class Translate extends Component {
  render() {
    const {
      children,
    } = this.props
    const {
      translate,
    } = this.context
    return (
      translate[children]
    )
  }
}

Translate.propTypes = {
  children: PropTypes.string.isRequired,
}

Translate.contextTypes = {
  translate: PropTypes.shape().isRequired,
}

export default Translate
