import T from 'i18n-react'
import _debounce from 'lodash/debounce'
import { Component } from 'react'
import {
  ADDRESS,
  AMOUNT,
  CITY,
  COUNTRY,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PAYMENT_INTERVAL,
  POST_CODE,
  PROJECT_ID,
  SALUTATION,
  WANTS_RECEIPT,
} from './constants/fieldNames'
import { NO_RECEIPT_OPTION_VALUE } from './constants/formValues'
import {
  checkEmails,
  checkIsIntegerValues,
  checkMaxValues,
  checkMinValues,
  checkRequiredValues,
} from './utils/formValidation'

function withFormState(View) {
  return class FormDataWrapper extends Component {
    state = {
      fields: {},
    }

    debounceSetState = _debounce(this.setState, 500)

    validateForm = (fields) => {
      const { enableProjectSelection } = this.props

      const errorsIsIntegerValues = checkIsIntegerValues([AMOUNT], fields)
      const wantsReceiptRequiredValues =
        fields[WANTS_RECEIPT] !== NO_RECEIPT_OPTION_VALUE
          ? [
              { fieldName: ADDRESS },
              { fieldName: CITY },
              { fieldName: POST_CODE },
            ]
          : []
      const errorsRequired = checkRequiredValues(
        [
          // If the project selection is not enabled there is no need to validate it
          ...(enableProjectSelection
            ? [
                {
                  fieldName: PROJECT_ID,
                  errorMessage: T.translate('donation.requiredProject'),
                },
              ]
            : []),
          { fieldName: AMOUNT },
          {
            fieldName: PAYMENT_INTERVAL,
            errorMessage: T.translate('donation.requiredInterval'),
          },
          { fieldName: COUNTRY },
          { fieldName: EMAIL },
          { fieldName: FIRST_NAME },
          { fieldName: LAST_NAME },
          { fieldName: SALUTATION },
          { fieldName: WANTS_RECEIPT },
          ...wantsReceiptRequiredValues,
        ],
        fields
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
        />
      )
    }
  }
}

export default withFormState
