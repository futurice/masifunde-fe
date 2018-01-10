import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import styled from 'styled-components'

import { isInvalid } from './utils'
import LabelButton from './LabelButton'
import ErrorMessage from './ErrorMessage'
import { defaultFont } from '../../styling/typography'
import SubHeader from './SubHeader'
import PageSection from '../../components/PageSection'
import { mdBreakpoint, smBreakpoint } from '../../styling/breakpoints'
import { fundraisingFormSpacing } from '../../utils/constants'

const otherAmountInputWidth = '30%'

const AmountLabelButton = LabelButton.extend`
  margin-right: ${fundraisingFormSpacing};
  padding-left: 0;
  padding-right: 0;
  
  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
  
  @media (min-width: ${mdBreakpoint}) {
    width: calc(14% - ${fundraisingFormSpacing});
  }
`

const fontSize = '1.2rem'

const OtherAmountContainer = styled.div`
  display: inline-block;
  position: relative;
  bottom: 0.5rem;
  font-size: ${fontSize};
  width: 100%;
  margin-right: ${fundraisingFormSpacing};
  
  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
  
  @media (min-width: ${mdBreakpoint}) {
    width: calc(${otherAmountInputWidth} - ${fundraisingFormSpacing});
  }

  input {
    font-size: ${fontSize};
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

  font-family: ${defaultFont};
  color: ${props => props.theme.pineCone};
`

const AmountDescription = styled.div`
  border-radius: 8px;
  background-color: #e9e0d3;
  padding: 15px 40px;
  text-align: center;
  width: 100%;

  span {
    color: #333333;
    text-align: left;
    
    &:first-of-type{
      color: ${({ theme }) => theme.orange};
      font-weight: bold;
    }
  }
`

const AmountLabelsContainer = styled.div`
  align-items: center;
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
      const amountDescription = findAmountDescription(input.value, amounts)
      return (
        <PageSection>
          <SubHeader>{title}</SubHeader>
          <AmountLabelsContainer className="row">
            {amounts.map(({ text, value }) => (
              <AmountLabelButton
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
              </AmountLabelButton>
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
                  {
                    amountDescription
                      ? (
                        <div className="col-12">
                          <AmountDescription>
                            <span>{input.value}€ </span>
                            <span>
                              = {amountDescription}
                            </span>
                          </AmountDescription>
                        </div>)
                      : null
                  }
                </Fragment>)
              : null
            }
            {isInvalid(meta) ? <ErrorMessage>{meta.error}</ErrorMessage> : ''}
          </AmountLabelsContainer>
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
