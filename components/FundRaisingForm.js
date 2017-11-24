import React, { Component } from 'react'
import ReactAsyncScript from 'react-async-script'
import { stringify } from 'query-string'
import PropTypes from 'prop-types'

// It is necessary class component since it is required for ref in ReactAsyncScript
// eslint-disable-next-line react/prefer-stateless-function
class FundRaisingForm extends Component {
  render() {
    return (
      <div>
        <div id="fbIframeDiv" style={{ position: 'relative' }} />
        <a target="_blank" rel="noopener noreferrer" href="http://www.fundraisingbox.com">
          <img
            border="0"
            style={{ border: '0 !important' }}
            src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
            alt="FundraisingBox Logo"
          />
        </a>
      </div>
    )
  }
}

function ScriptParametersWrapper({ amount }) {
  const URL = 'https://secure.fundraisingbox.com/app/paymentJS'

  // Info about parameters
  // https://developer.fundraisingbox.com/docs/form-prepopulation-api
  const parameters = {
    hash: 'j3ip42zwp3mlewb9',
    amount,
    fb_project_id: 3522, // Select fund
  }

  const Form = ReactAsyncScript(
    FundRaisingForm,
    `${URL}?${stringify(parameters)}`,
    {
      globalName: 'FundRaisingBox',
      removeOnUnmount: true,
    },
  )

  return <Form />
}

ScriptParametersWrapper.propTypes = {
  amount: PropTypes.number,
}

ScriptParametersWrapper.defaultProps = {
  amount: undefined,
}

export default ScriptParametersWrapper
