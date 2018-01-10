import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import { isInvalid } from './utils'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'
import { defaultFont } from '../../styling/typography'
import SubHeader from './SubHeader'
import PageSection from '../PageSection'

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

  font-family: ${defaultFont};
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

const fontSize = '1.2rem'

const OtherAmountContainer = styled.div`
  display: inline-block;
  position: relative;
  bottom: 0.5rem;
  font-size: ${fontSize};
  margin-top: 0.6rem;

  input {
    font-size: ${fontSize};
  }
`

const findAmountDescription = (searchedValue, amounts) => {
  const object = amounts.find(({ value }) => value === Number(searchedValue))
  return object ? object.description : null
}

const DonationAmountField = ({
  fieldName,
  title,
  amounts,
  enableOtherAmount,
  otherAmountPlaceholder,
}) => (
  <Field name={fieldName}>
    {({ input, meta }) => {
      const otherAmountDescription = findAmountDescription(input.value, amounts)
      return (
        <PageSection>
          <SubHeader>{title}</SubHeader>
          <div className="row">
            {amounts.map(({ text, value }) => (
              <div className="col">
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
              </div>
            ))}
            {enableOtherAmount
              ? (
                <Fragment>
                  <div className="col">
                    <OtherAmountContainer>
                      <EuroPostfix>€</EuroPostfix>
                      <input
                        {...input}
                        className="form-control"
                        type="text"
                        placeholder={otherAmountPlaceholder}
                      />
                    </OtherAmountContainer>
                  </div>
                  {
                    otherAmountDescription
                      ? (
                        <AmountDescription>
                          <span>{otherAmountDescription}</span>
                        </AmountDescription>)
                      : null
                  }
                </Fragment>)
              : null
            }
            {isInvalid(meta) ? <ErrorMessage>{meta.error}</ErrorMessage> : ''}
          </div>
        </PageSection>
      )
    }}
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
