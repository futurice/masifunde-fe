import React, { Component } from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import _debounce from 'lodash/debounce'

import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { RouteNames } from '../../routes'
import Markdown from '../../components/Markdown'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeASponsorPage } from '../../api/howToSupport'
import imagePropTypes from '../../propTypes/image'
import { subtitle } from '../../styling/typography'
import FundRaisingForm from '../../components/Fundraisingbox/FundRaisingForm'
import DonationIntervalField from '../../components/Fundraisingbox/DonationIntervalField'
import DonationAmountField from '../../components/Fundraisingbox/DonationAmountField'
import Divider from '../../components/Fundraisingbox/Divider'

const H2 = styled.h2`
  ${subtitle};
  margin-bottom: 2rem;
  margin-top: 1.6rem;
`

const H2NoTopMargin = H2.extend`
  margin-top: 0;
`

const Image = styled.img`
  border-radius: ${props => props.theme.roundedImageBorderRadius};
`

const Learn4LifeId = '3520'
const fieldName = {
  projectId: 'projectId',
  amount: 'amount',
  paymentInterval: 'interval',
}

class BecomeSponsor extends Component {
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

    isRequired([
      { fieldName: fieldName.amount, errorMessage: 'Bitte wählen Sie eine Betrag.' },
      { fieldName: fieldName.paymentInterval, errorMessage: 'Bitte wählen Sie ein Intervall für Ihre Spende.' },
    ])

    if (!Object.keys(errors).length) {
      this.debounceSetState({
        ...this.state,
        fields: {
          ...fields,
          // Cast to integer
          [fieldName.amount]: Number(fields[fieldName.amount]),
          [fieldName.projectId]: Number(Learn4LifeId),
        },
      })
    }
    return errors
  }

  render() {
    const {
      metaTitle,
      metaDescription,
      title,
      introSubtitle1,
      introMarkdown1,
      introSubtitle2,
      introMarkdown2,
      image,
      section2Title,
      section2ReferenceList,
      section3Title,
      section3ReferenceList,
      section4Title,
      bannerTitle,
      bannerButtonText,
    } = this.props
    return (
      <div>
        <Head title={metaTitle} description={metaDescription} />
        <Container>
          <div>
            <h1>{title}</h1>
            <div className="row">
              <div className="col-12 col-md-7">
                <H2NoTopMargin>{introSubtitle1}</H2NoTopMargin>
                <Markdown source={introMarkdown1} />
                <H2>{introSubtitle2}</H2>
                <Markdown source={introMarkdown2} />
              </div>
              <div className="col-12 col-md-5">
                <Image src={image.url} alt={image.title} />
              </div>
            </div>
          </div>

          <Divider />

          <Form
            onSubmit={() => {}}
            validate={this.validateForm}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>

                <DonationIntervalField
                  fieldName={fieldName.paymentInterval}
                  title={section2Title}
                  intervals={section2ReferenceList}
                />

                <DonationAmountField
                  fieldName={fieldName.amount}
                  title={section3Title}
                  amounts={section3ReferenceList}
                />
                <button className="d-none" ref={(form) => { this.formRef = form }}>
                  Submit
                </button>
              </form>
            )}
          />

          <Divider />

          <H2>{section4Title}</H2>

          <FundRaisingForm hiddenFields={{ ...this.state.fields }} onSubmit={this.submitForm} />
        </Container>
        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={RouteNames.Contact}
        />
      </div>
    )
  }
}

BecomeSponsor.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introSubtitle1: PropTypes.string.isRequired,
  introMarkdown1: PropTypes.string.isRequired,
  introSubtitle2: PropTypes.string.isRequired,
  introMarkdown2: PropTypes.string.isRequired,
  image: PropTypes.shape(imagePropTypes).isRequired,
  section2Title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3ReferenceList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  section4Title: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

BecomeSponsor.defaultProps = {
  metaDescription: undefined,
}

BecomeSponsor.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeASponsorPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(BecomeSponsor)

