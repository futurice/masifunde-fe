import React, { Component, Fragment } from 'react'
import ReactAsyncScript from 'react-async-script'
import { stringify } from 'query-string'
import PropTypes from 'prop-types'

// It is necessary class component since it is required for ref in ReactAsyncScript
// eslint-disable-next-line react/prefer-stateless-function

let interval = null

let iframe = null

class FundRaisingForm extends Component {
  constructor(props) {
    super(props)
    this.iframeOnMouseover = this.iframeOnMouseover.bind(this)
  }
  componentDidMount() {
    interval = setInterval(() => {
      const iframeContainer = document.getElementById('fbIframeDiv')
      const frame = iframeContainer.querySelector('iframe')
      if (frame) {
        iframe = frame
        frame.addEventListener('mouseover', this.iframeOnMouseover)
        clearInterval(interval)
      }
    }, 10)
  }
  componentWillUnmount() {
    clearInterval(interval)
    if (iframe) {
      iframe.removeEventListener('mouseover', this.iframeOnMouseover)
    }
  }
  iframeOnMouseover() {
    this.props.onMouseHover()
  }
  render() {
    return (
      <Fragment>
        <div
          id="fbIframeDiv"
        />
        <a target="_blank" rel="noopener noreferrer" href="http://www.fundraisingbox.com">
          <img
            border="0"
            style={{ border: '0 !important' }}
            src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
            alt="FundraisingBox Logo"
          />
        </a>
      </Fragment>
    )
  }
}

FundRaisingForm.propTypes = {
  onMouseHover: PropTypes.func.isRequired,
}

function ScriptParametersWrapper({
  hash, amount, projectId, onMouseHover,
}) {
  const BaseUrl = 'https://secure.fundraisingbox.com/app/paymentJS'

  // Info about parameters
  // https://developer.fundraisingbox.com/docs/form-prepopulation-api
  const parameters = {
    hash,
    amount,
    fb_project_id: projectId, // Select fund
  }
  const FullUrl = `${BaseUrl}?${stringify(parameters)}`

  const Form = ReactAsyncScript(FundRaisingForm, FullUrl, {
    globalName: 'FundRaisingBox',
    removeOnUnmount: true,
  })

  return <Form onMouseHover={onMouseHover} />
}

ScriptParametersWrapper.propTypes = {
  hash: PropTypes.string.isRequired,
  amount: PropTypes.number,
  projectId: PropTypes.number,
  onMouseHover: PropTypes.func.isRequired,
}

ScriptParametersWrapper.defaultProps = {
  amount: undefined,
  projectId: undefined,
}

export default ScriptParametersWrapper
