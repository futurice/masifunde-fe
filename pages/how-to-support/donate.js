/* eslint-disable function-paren-newline */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import _debounce from 'lodash/debounce'

import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchDonatePage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import DonationPersonalDetailsForm from '../../components/Fundraisingbox/DonationPersonalDetailsForm'
import DonationIntervalField from '../../components/Fundraisingbox/DonationIntervalField'
import DonationAmountField from '../../components/Fundraisingbox/DonationAmountField'
import { checkPositiveIntValues, checkRequiredValues } from '../../components/Fundraisingbox/utils/formValidation'
import PageSection from '../../components/Fundraisingbox/FundraisingPageSection'
import CenteredText from '../../components/CenteredText'
import FundraisingFormContainer from '../../components/Fundraisingbox/FundraisingFormContainer'
import DonationProjectField from '../../components/Fundraisingbox/DonationProjectField'

const deProjectId = '3531'
const saProjectId = '3522'
const fieldName = {
  projectId: 'projectId',
  amount: 'amount',
  paymentInterval: 'interval',
}

const MainHeading = styled.h1`
  width: 100%;
`

const HiddenButton = styled.button`
  display: none;
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
    const errorsPositiveInt = checkPositiveIntValues([fieldName.amount], fields)
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
              [fieldName.projectId]: saProjectId,
            }}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DonationProjectField
                  deProjectId={deProjectId}
                  fieldName={fieldName.projectId}
                  markdownDe={section1MarkdownDe}
                  markdownSa={section1MarkdownSa}
                  saProjectId={saProjectId}
                  title={section1title}
                />

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

                <HiddenButton ref={(form) => { this.formRef = form }}>
                  Submit
                </HiddenButton>
              </form>
            )}
          />

        </FundraisingFormContainer>
        <DonationPersonalDetailsForm
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
