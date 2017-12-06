/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled, { css } from 'styled-components'
import _debounce from 'lodash/debounce'

import { RouteNames } from '../../routes'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import Button from '../../components/Button'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchDonatePage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import Markdown from '../../components/Markdown'
import FundRaisingForm from '../../components/FundRaisingForm'

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

const CountryLabel = styled.label`
  border-radius: 8px;
  border: solid 3px ${props => props.theme.orange};
  color: #4f463f;
  padding: 20px;
  display: block !important;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: ${props => props.theme.orange};
  }

  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: ${props => props.theme.orange};
  `} 
  
  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
`

const Divider = styled.div`
  border: 0.5px solid #bbb;
  margin: 50px 0;
`

const OtherAmountContainer = styled.div`
  display: inline-block;
  position: relative;
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
  color: #77695c;
`

const SubHeader = styled.h3`
  ${props => props.isValid && 'color: red;'};
`

const DeProjectId = '3522'
const SaProjectId = '3523'
const fieldName = {
  projectId: 'projectId',
  amount: 'amount',
  paymentInterval: 'interval',
}

class Donate extends Component {
  state = {
    values: {
      [fieldName.projectId]: undefined,
      [fieldName.paymentInterval]: undefined,
      [fieldName.amount]: undefined,
    },
  }

  isValid = meta => meta.error && meta.touched

  debounceSetState = _debounce(this.setState, 500)

  validateForm = (values) => {
    const errors = {}
    const isRequired = (keysArray) => {
      keysArray.forEach((key) => {
        if (!values[key]) {
          errors[key] = '*'
        }
      })
    }

    isRequired([
      fieldName.projectId,
      fieldName.amount,
      fieldName.paymentInterval,
    ])

    if (!Object.keys(errors).length) {
      this.debounceSetState({
        ...this.state,
        values: {
          ...values,
          // Cast to integer
          [fieldName.amount]: Number(values[fieldName.amount]),
          [fieldName.projectId]: Number([fieldName.projectId]),
        },
      })
    }
    return errors
  }

  render() {
    const {
      metaTitle,
      metaDescription,
      introHeading,
      introMarkdown,
      section1title,
      section1MarkdownDe,
      section1MarkdownSa,
      section2title,
      section2ReferenceList,
      section3Title,
      section3ReferenceList,
      section3Text,
      section4Title,
      bannerTitle,
      bannerButtonText,
    } = this.props

    return (
      <Fragment>
        <Head title={metaTitle} description={metaDescription} />
        <div className="container">
          <h1>{introHeading}</h1>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Markdown source={introMarkdown} />
            </div>
          </div>

          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name={fieldName.projectId}>
                  {({ input, meta }) => (
                    <Fragment>
                      <SubHeader isValid={this.isValid(meta)}>{section1title} *</SubHeader>
                      <div className="row">
                        <div className="col offset-lg-3">
                          <div className="row">
                            <div className="col">
                              <CountryLabel
                                htmlFor="countryInputDe"
                                isActive={input.value === DeProjectId}
                              >
                                <input
                                  {...input}
                                  type="radio"
                                  value={DeProjectId}
                                  id="countryInputDe"
                                  autoComplete="off"
                                />
                                <Markdown source={section1MarkdownDe} />
                              </CountryLabel>
                            </div>
                            <div className="col" data-toggle="buttons">
                              <CountryLabel
                                htmlFor="countryInputSa"
                                isActive={input.value === SaProjectId}
                              >
                                <input
                                  {...input}
                                  type="radio"
                                  value={SaProjectId}
                                  id="countryInputSa"
                                  autoComplete="off"
                                />
                                <Markdown source={section1MarkdownSa} />
                              </CountryLabel>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Field>

                <Divider />

                <Field name={fieldName.paymentInterval}>
                  {({ input, meta }) => (
                    <Fragment>
                      <SubHeader isValid={this.isValid(meta)}>{section2title} *</SubHeader>
                      <div className="row">
                        <div className="col offset-lg-3">
                          {section2ReferenceList.map(({ value, name }) => (
                            <LabelButton
                              className="btn"
                              isActive={input.value === value}
                              key={value}
                              htmlFor={`frequencyInputOption${value}`}
                            >
                              <input
                                {...input}
                                type="radio"
                                value={value}
                                id={`frequencyInputOption${value}`}
                                autoComplete="off"
                              />
                              {name}
                            </LabelButton>
                          ))}
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Field>

                <Field name={fieldName.amount}>
                  {({ input, meta }) => (
                    <Fragment>
                      <SubHeader isValid={this.isValid(meta)}>{section3Title} *</SubHeader>
                      <div className="row">
                        <div className="col offset-lg-3">
                          {section3ReferenceList.map(({ text, value }) => (
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

                          <OtherAmountContainer>
                            <EuroPostfix>€</EuroPostfix>
                            <input
                              {...input}
                              className="form-control"
                              type="text"
                              placeholder={section3Text}
                            />
                          </OtherAmountContainer>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Field>
              </form>
            )}
          />

          <Divider />
          <SubHeader>{section4Title}</SubHeader>
          <FundRaisingForm
            interval={this.state.values.interval}
            amount={this.state.values.amount}
            projectId={this.state.values.projectId}
          />
        </div>
        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={RouteNames.Contact}
        />
      </Fragment>
    )
  }
}

Donate.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1title: PropTypes.string.isRequired,
  section1MarkdownDe: PropTypes.string.isRequired,
  section1MarkdownSa: PropTypes.string.isRequired,
  section2title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Text: PropTypes.string.isRequired,
  section3ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  section4Title: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

Donate.defaultProps = {
  metaDescription: undefined,
}

Donate.getInitialProps = async function initialProps({ query }) {
  return fetchDonatePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Donate)
