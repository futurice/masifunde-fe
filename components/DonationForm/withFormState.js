import React, { Component } from 'react'
import _debounce from 'lodash/debounce'
import {
  checkEmails,
  checkMaxValues,
  checkMinValues,
  checkIsIntegerValues,
  checkRequiredValues,
} from './utils/formValidation'
import { FIELD_NAMES, NO_RECEIPT_OPTION_VALUE } from './constants/formValues'
import {
  ADDRESS,
  WANTS_RECEIPT,
  CITY,
  POST_CODE,
  PROJECT_ID,
  AMOUNT,
  PAYMENT_INTERVAL,
  COUNTRY,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  SALUTATION,
} from './constants/fieldNames'

function withFormState(View) {
  return class FormDataWrapper extends Component {
    state = {
      fields: {},
    }
    debounceSetState = _debounce(this.setState, 500)

    validateForm = (fields) => {
      const errorsIsIntegerValues = checkIsIntegerValues([AMOUNT], fields)
      const wantsReceiptRequiredValues =
        fields[WANTS_RECEIPT] !== NO_RECEIPT_OPTION_VALUE
          ? [{ fieldName: ADDRESS }, { fieldName: CITY }, { fieldName: POST_CODE }]
          : []
      const errorsRequired = checkRequiredValues(
        [
          {
            fieldName: PROJECT_ID,
            errorMessage: 'Bitte wählen Sie, an wen Ihre Spende gehen soll.',
          },
          { fieldName: AMOUNT },
          {
            fieldName: PAYMENT_INTERVAL,
            errorMessage: 'Bitte wählen Sie ein Intervall für Ihre Spende.',
          },
          { fieldName: COUNTRY },
          { fieldName: EMAIL },
          { fieldName: FIRST_NAME },
          { fieldName: LAST_NAME },
          { fieldName: SALUTATION },
          { fieldName: WANTS_RECEIPT },
          ...wantsReceiptRequiredValues,
        ],
        fields,
      )
      const errorsEmails = checkEmails([EMAIL], fields)
      const errorsMinValues = checkMinValues([AMOUNT], fields, 1)
      const errorsMaxValues = checkMaxValues([AMOUNT], fields, 10000)

      const errors = {
        ...errorsEmails,
        ...errorsMinValues,
        ...errorsMaxValues,
        ...errorsIsIntegerValues,
        ...errorsRequired,
      }

      const noErrors = !Object.keys(errors).length

      if (noErrors) {
        this.debounceSetState({
          fields: {
            ...fields,
            // Cast to integer
            [AMOUNT]: Number(fields[AMOUNT]),
            [PROJECT_ID]: Number(fields[PROJECT_ID]),
          },
        })
      }
      return errors
    }

    render() {
      return (
        <View
          {...this.props}
          fields={this.state.fields}
          validateForm={this.validateForm}
          fieldName={FIELD_NAMES}
        />
      )
    }
  }
}

export default withFormState
