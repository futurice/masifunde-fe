import React, { Component } from 'react'
import PropTypes from 'prop-types'

class I18nProvider extends Component {
  getChildContext() {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const translate = require(`../i18n/${this.props.locale}.json`)
    return {
      translate,
    }
  }


  render() {
    return <div>{this.props.children}</div>
  }
}

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
}

I18nProvider.childContextTypes = {
  translate: PropTypes.shape(),
  locale: PropTypes.string.isRequired,
}

export default I18nProvider
