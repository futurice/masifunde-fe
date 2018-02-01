import { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

class Translate extends Component {
  render() {
    const {
      children,
    } = this.props
    const {
      translate,
    } = this.context
    return (
      get(translate, children)
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
