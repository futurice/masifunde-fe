import React, { Component } from 'react'
import ReactAsyncScript from 'react-async-script'
import qs from 'qs'
import PropTypes from 'prop-types'

export const IFRAME_ID = 'fbIframeDiv'

let intervalRef = null
let iframe = null

// / It is necessary class component since it is required for ref in ReactAsyncScript
// eslint-disable-next-line react/prefer-stateless-function
class FundraisingIframe extends Component {
  componentDidMount() {
    intervalRef = setInterval(() => {
      const iframeContainer = document.getElementById(IFRAME_ID)
      const frame = iframeContainer.querySelector('iframe')
      if (frame) {
        iframe = frame
        frame.addEventListener('mouseover', this.iframeOnMouseover)
        clearInterval(intervalRef)
      }
    }, 10)

    if (this.props.scrollToIframe) {
      window.location.hash = IFRAME_ID
    }
  }
  componentWillUnmount() {
    clearInterval(intervalRef)
    if (iframe) {
      iframe.removeEventListener('mouseover', this.iframeOnMouseover)
    }
  }
  iframeOnMouseover = () => {
    this.props.onMouseHover()
  }
  render() {
    return (
      <div id={IFRAME_ID} style={{ position: 'relative' }} />
    )
  }
}

FundraisingIframe.propTypes = {
  onMouseHover: PropTypes.func.isRequired,
  scrollToIframe: PropTypes.bool,
}

FundraisingIframe.defaultProps = {
  scrollToIframe: false,
}

function ScriptParametersWrapper({
  hash,
  amount,
  projectId,
  salutation,
  title,
  firstName,
  lastName,
  companyName,
  address,
  postCode,
  city,
  country,
  email,
  interval,
  wantsReceipt,
  message,
  paymentMethod,
  wantsNewsletter,
  isTermsAccepted,
  isPrivacyAccepted,
  ...rest
}) {
  const baseUrl = 'https://secure.fundraisingbox.com/app/paymentJS'

  // Info about parameters
  // https://developer.fundraisingbox.com/docs/form-prepopulation-api
  const parameters = {
    address,
    amount,
    city,
    company_name: companyName,
    country,
    email,
    fb_project_id: projectId, // Select fund
    first_name: firstName,
    hash,
    interval,
    is_privacy_accepted: isPrivacyAccepted,
    is_terms_accepted: isTermsAccepted,
    last_name: lastName,
    message,
    payment_method: paymentMethod,
    post_code: postCode,
    salutation,
    title,
    wants_newsletter: wantsNewsletter,
    wants_receipt: wantsReceipt,
  }
  const FullUrl = `${baseUrl}?${qs.stringify(parameters)}`

  const Form = ReactAsyncScript(FundraisingIframe, FullUrl, {
    globalName: 'FundRaisingBox',
    removeOnUnmount: true,
  })

  return <Form {...rest} />
}

ScriptParametersWrapper.propTypes = {
  address: PropTypes.string,
  amount: PropTypes.number,
  city: PropTypes.string,
  companyName: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  firstName: PropTypes.string,
  hash: PropTypes.string.isRequired,
  interval: PropTypes.oneOf([0, '0', 1, '1', 3, '3', 6, '6', 12, '12']),
  isPrivacyAccepted: PropTypes.oneOf([0, '0', 1, '1']),
  isTermsAccepted: PropTypes.oneOf([0, '0', 1, '1']),
  lastName: PropTypes.string,
  message: PropTypes.string,
  paymentMethod: PropTypes.oneOf([
    'direct_debit',
    'sepa_direct_debit',
    'micropayment_direct_debit',
    'bfs_direct_debit',
    'paypal',
    'sofortueberweisung',
    'micropayment_credit_card',
    'cubits',
    'eps',
  ]),
  postCode: PropTypes.string,
  projectId: PropTypes.number,
  salutation: PropTypes.oneOf(['Mr.', 'Mrs.']),
  title: PropTypes.string,
  wantsNewsletter: PropTypes.oneOf([0, '0', 1, '1']),
  wantsReceipt: PropTypes.oneOf([
    'no_receipt',
    'receipt_now',
    'receipt_end_of_year',
  ]),
}

ScriptParametersWrapper.defaultProps = {
  address: undefined,
  amount: undefined,
  city: undefined,
  companyName: undefined,
  country: undefined,
  email: undefined,
  firstName: undefined,
  interval: undefined,
  isPrivacyAccepted: undefined,
  isTermsAccepted: undefined,
  lastName: undefined,
  message: undefined,
  paymentMethod: undefined,
  postCode: undefined,
  projectId: undefined,
  salutation: undefined,
  title: undefined,
  wantsNewsletter: undefined,
  wantsReceipt: undefined,
}

export default ScriptParametersWrapper
