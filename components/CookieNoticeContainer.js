import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

import { haveCookiesBeenAccepted, markCookiesAccepted } from '../utils/cookies'
import CookieNotice from './CookieNotice'

export default class CookieNoticeContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  state = {
    showCookieNotice: false,
  }

  componentDidMount() {
    // We cannot check for cookie acceptance on the server because that
    // doesn't have access to the browser's localStorage. We thus need
    // to do the check in componentDidMount (componentWillMount also
    // runs on the server).
    //
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ showCookieNotice: !haveCookiesBeenAccepted() })
  }

  handleAccept = () => {
    markCookiesAccepted()
    this.setState({ showCookieNotice: false })
  }

  render() {
    const { children } = this.props
    const { showCookieNotice } = this.state

    return (
      <Fragment>
        {showCookieNotice && <CookieNotice onAccept={this.handleAccept} />}
        {children}
      </Fragment>
    )
  }
}
