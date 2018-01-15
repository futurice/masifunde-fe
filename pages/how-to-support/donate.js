/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'

import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchDonatePage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import FundraisingInputForm from '../../components/Fundraisingbox/FundraisingInputForm'
import DonationIntervalField from '../../components/Fundraisingbox/DonationIntervalField'
import DonationAmountField from '../../components/Fundraisingbox/DonationAmountField'
import { isPositiveInteger } from '../../components/Fundraisingbox/utils'
import ErrorMessage from '../../components/Fundraisingbox/ErrorMessage'
import PageSection from '../../components/Fundraisingbox/FundraisingboxPageSection'
import CenteredText from '../../components/CenteredText'
import { smBreakpoint } from '../../styling/breakpoints'
import SubHeader from '../../components/Fundraisingbox/SubHeader'
import LabelButton from '../../components/Fundraisingbox/LabelButton'
import { fundraisingFormSpacing } from '../../utils/constants'
import FundraisingFormContainer from '../../components/Fundraisingbox/FundraisingFormContainer'

const CountryLabelContainer = styled.div`
  width: 100%;
  margin-right: ${fundraisingFormSpacing};
  
  @media (min-width: ${smBreakpoint}) {
    width: calc(50% - ${fundraisingFormSpacing});
  }
`

const DeProjectId = '3531'
const SaProjectId = '3522'
const fieldName = {
  projectId: 'projectId',
  amount: 'amount',
  paymentInterval: 'interval',
}

const MainHeading = styled.h1`
  width: 100%;
`

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
      bannerButtonUrl,
    } = this.props

    return (
      <Fragment>
        <Head title={metaTitle} description={metaDescription} />

        <PageSection>
          <MainHeading>{introHeading}</MainHeading>
          <CenteredText source={introMarkdown} />
        </PageSection>

        <FundraisingFormContainer>
          <Form
            onSubmit={() => {}}
            initialValues={{
              [fieldName.projectId]: SaProjectId,
            }}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name={fieldName.projectId}>
                  {({ input, meta }) => (
                    <PageSection>
                      <SubHeader className="row">{section1title}</SubHeader>
                      <div className="row">
                        <CountryLabelContainer data-toggle="buttons">
                          <LabelButton
                            className="btn"
                            isActive={input.value === SaProjectId}
                            htmlFor="countryInputSa"
                          >
                            <input
                              {...input}
                              type="radio"
                              value={SaProjectId}
                              id="countryInputSa"
                              autoComplete="off"
                            />
                            {section1MarkdownSa}
                          </LabelButton>
                        </CountryLabelContainer>
                        <CountryLabelContainer>
                          <LabelButton
                            className="btn"
                            isActive={input.value === DeProjectId}
                            htmlFor="countryInputDe"
                          >
                            <input
                              {...input}
                              type="radio"
                              value={DeProjectId}
                              id="countryInputDe"
                              autoComplete="off"
                            />
                            {section1MarkdownDe}
                          </LabelButton>
                        </CountryLabelContainer>
                      </div>
                      <ErrorMessage meta={meta} />
                    </PageSection>
                  )
                  }
                </Field>

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

        </FundraisingFormContainer>
        <FundraisingInputForm
          formTitle={section4Title}
          hiddenFields={{ ...this.state.fields }}
          onSubmit={this.submitForm}
          fundraisingboxIframeTitle={section5Title}
        />

        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={bannerButtonUrl}
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
  bannerButtonUrl: PropTypes.string.isRequired,
}

Donate.defaultProps = {
  metaDescription: undefined,
}

Donate.getInitialProps = async function initialProps({ query }) {
  return fetchDonatePage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Donate)
