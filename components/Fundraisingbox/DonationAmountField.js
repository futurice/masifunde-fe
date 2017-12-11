import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import Button from '../../components/Button'
import { isValid } from './utils'

const SubHeader = styled.h3`
  ${props => props.isValid && 'color: #dc3545;'};
`

const LabelButton = Button.withComponent('label').extend`
  margin-right: 10px;
  
  &:last-child {
    margin-right: 0;
  }

  // Hide input (copied from boostrap)
  input {
    position: absolute;
    clip: rect(0,0,0,0);
    pointer-events: none;
  }
`

const EuroPostfix = styled.span`
  position: absolute;
  right: 0;
  display: block;
  transform: translate(0, -50%);
  top: 50%;
  pointer-events: none;
  width: 25px;
  text-align: center;
  font-style: normal;

  font-family: Lato, sans-serif;
  color: ${props => props.theme.pineCone};
`

const AmountDescription = styled.div`
  border-radius: 8px;
  padding: 15px 40px;
  background-color: #e9e0d3;

  span {
    font-weight: bold;
    text-align: left;
    color: #333333;
  }
`

const OtherAmountContainer = styled.div`
  display: inline-block;
  position: relative;
`

const findAmountDescription = (searchedValue, amounts) => {
  const object = amounts.find(({ value }) => value === Number(searchedValue))
  return object ? object.description : 'Other value'
}

const DonationAmountField = ({
  fieldName,
  title,
  amounts,
  enableOtherAmount,
  otherAmountPlaceholder,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => (
      <Fragment>
        <SubHeader isValid={isValid(meta)}>{title} *</SubHeader>
        <div className="row">
          <div className="col offset-lg-3">
            {amounts.map(({ text, value }) => (
              <LabelButton
                className="btn"
                isActive={Number(input.value) === value}
                key={value}
                htmlFor={`amountInputOption${value}`}
              >
                <input
                  {...input}
                  type="radio"
                  value={value}
                  id={`amountInputOption${value}`}
                  autoComplete="off"
                />
                {text}
              </LabelButton>
            ))}
            {enableOtherAmount
              ? (
                <Fragment>
                  <OtherAmountContainer>
                    <EuroPostfix>€</EuroPostfix>
                    <input
                      {...input}
                      className="form-control"
                      type="text"
                      placeholder={otherAmountPlaceholder}
                    />
                  </OtherAmountContainer>
                  <AmountDescription>
                    <span>
                      {input.value
                        ? findAmountDescription(input.value, amounts)
                        : 'Select the suggested amount'
                      }
                    </span>
                  </AmountDescription>
                </Fragment>)
              : null
            }
          </div>
        </div>
      </Fragment>
    )}
  </Field>
)

DonationAmountField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  enableOtherAmount: PropTypes.bool,
  otherAmountPlaceholder: PropTypes.string,
  amounts: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

DonationAmountField.defaultProps = {
  enableOtherAmount: false,
  otherAmountPlaceholder: 'Other amount',
}

export default DonationAmountField
