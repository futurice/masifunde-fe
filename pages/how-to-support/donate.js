/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled, { css } from 'styled-components'
import _debounce from 'lodash/debounce'

import { RouteNames } from '../../routes'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchDonatePage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import Markdown from '../../components/Markdown'
import FundRaisingForm from '../../components/Fundraisingbox/FundRaisingForm'
import DonationIntervalField from '../../components/Fundraisingbox/DonationIntervalField'
import DonationAmountField from '../../components/Fundraisingbox/DonationAmountField'
import { isInvalid, isPositiveInteger } from '../../components/Fundraisingbox/utils'
import Divider from '../../components/Fundraisingbox/Divider'
import ErrorMessage from '../../components/Fundraisingbox/ErrorMessage'
import PageSection from '../../components/PageSection'
import IntroText from '../../components/IntroText'

const CountryLabel = styled.label`
  border-radius: 8px;
  border: solid 3px ${props => props.theme.orange};
  color: #4f463f;
  padding: 20px;
  display: block !important;
  cursor: pointer;
  height: 100%;

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

const CountryLabelContainer = styled.div`
  margin-top: 0.5rem;
`

const DeProjectId = '3531'
const SaProjectId = '3522'
const fieldName = {
  projectId: 'projectId',
  amount: 'amount',
  paymentInterval: 'interval',
}

class Donate extends Component {
  state = {
    fields: {},
  }
  debounceSetState = _debounce(this.setState, 500)

  submitForm = () => {
    this.formRef.click()
  }

  validateForm = (fields) => {
    const errors = {}
    const isRequired = (keysArray) => {
      keysArray.forEach((obj) => {
        if (!fields[obj.fieldName]) {
          errors[obj.fieldName] = obj.errorMessage
        }
      })
    }

    const isPositiveInt = (keysArray) => {
      keysArray.forEach((key) => {
        if (!isPositiveInteger(fields[key])) {
          errors[key] = 'Bitte wählen Sie eine Betrag größer als Null.'
        }
      })
    }

    isPositiveInt([fieldName.amount])
    isRequired([
      { fieldName: fieldName.projectId, errorMessage: 'Bitte wählen Sie, an wen Ihre Spende gehen soll.' },
      { fieldName: fieldName.amount, errorMessage: 'Bitte wählen Sie eine Betrag größer als Null.' },
      { fieldName: fieldName.paymentInterval, errorMessage: 'Bitte wählen Sie ein Intervall für Ihre Spende.' },
    ])

    if (!Object.keys(errors).length) {
      this.debounceSetState({
        ...this.state,
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
      section5Title,
      bannerTitle,
      bannerButtonText,
    } = this.props

    return (
      <Fragment>
        <Head title={metaTitle} description={metaDescription} />

        <PageSection>
          <h1>{introHeading}</h1>
          <IntroText source={introMarkdown} />
        </PageSection>

        <div className="container">
          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name={fieldName.projectId}>
                  {({ input, meta }) => {
                    const inputValue = input.value || SaProjectId
                    return (
                      <Fragment>
                        <h3>{section1title}</h3>
                        <div className="offset-md-3 col-md-8">
                          <div className="row">
                            <CountryLabelContainer className="col-sm-6" data-toggle="buttons">
                              <CountryLabel
                                htmlFor="countryInputSa"
                                isActive={inputValue === SaProjectId}
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
                            </CountryLabelContainer>
                            <CountryLabelContainer className="col-sm-6">
                              <CountryLabel
                                htmlFor="countryInputDe"
                                isActive={inputValue === DeProjectId}
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
                            </CountryLabelContainer>
                          </div>
                          {isInvalid(meta) ? <ErrorMessage>{meta.error}</ErrorMessage> : ''}
                        </div>
                      </Fragment>
                    )
                  }}
                </Field>

                <Divider />

                <DonationIntervalField
                  fieldName={fieldName.paymentInterval}
                  title={section2title}
                  intervals={section2ReferenceList}
                />
                <DonationAmountField
                  fieldName={fieldName.amount}
                  title={section3Title}
                  amounts={section3ReferenceList}
                  enableOtherAmount
                  otherAmountPlaceholder={section3Text}
                />
                <button className="d-none" ref={(form) => { this.formRef = form }}>Submit</button>
              </form>
            )}
          />

          <Divider />
          <h3>{section4Title}</h3>
          <FundRaisingForm
            hiddenFields={{ ...this.state.fields }}
            onSubmit={this.submitForm}
            fundraisingboxIframeTitle={section5Title}
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
  section5Title: PropTypes.string.isRequired,
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
