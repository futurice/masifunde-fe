import React, { Component } from 'react'
import _debounce from 'lodash/debounce'
import { checkPositiveIntValues, checkRequiredValues } from './utils/formValidation'
import { fieldName, noReceiptOptionValue } from './constants'

function withFormState(View) {
  return class FormDataWrapper extends Component {
    state = {
      fields: {},
    }
    debounceSetState = _debounce(this.setState, 500)

    validateForm = (fields) => {
      const errorsPositiveInt = checkPositiveIntValues([fieldName.amount], fields)
      const wantsReceiptRequiredValues =
        fields[fieldName.wantsReceipt] !== noReceiptOptionValue
          ? [
            { fieldName: fieldName.address },
            { fieldName: fieldName.city },
            { fieldName: fieldName.postCode },
          ]
          : []
      const errorsRequired = checkRequiredValues(
        [
          {
            fieldName: fieldName.projectId,
            errorMessage: 'Bitte wählen Sie, an wen Ihre Spende gehen soll.',
          },
          {
            fieldName: fieldName.amount,
            errorMessage: 'Bitte wählen Sie eine Betrag größer als Null.',
          },
          {
            fieldName: fieldName.paymentInterval,
            errorMessage: 'Bitte wählen Sie ein Intervall für Ihre Spende.',
          },
          { fieldName: fieldName.country },
          { fieldName: fieldName.email },
          { fieldName: fieldName.firstName },
          { fieldName: fieldName.lastName },
          { fieldName: fieldName.salutation },
          { fieldName: fieldName.wantsReceipt },
          ...wantsReceiptRequiredValues,
        ],
        fields,
      )

      const errors = { ...errorsPositiveInt, ...errorsRequired }

      const noErrors = !Object.keys(errors).length

      if (noErrors) {
        this.debounceSetState({
          fields: {
            ...fields,
            // Cast to integer
            [fieldName.amount]: Number(fields[fieldName.amount]),
            [fieldName.projectId]: Number(fields[fieldName.projectId]),
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
          fieldName={fieldName}
        />
      )
    }
  }
}

export default withFormState
