import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import createDecorator from 'final-form-calculate'

import withLayout from '../../components/withLayout'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import Markdown from '../../components/Markdown'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeASponsorPage } from '../../api/howToSupport'
import imagePropTypes from '../../propTypes/image'
import PageSection from '../../components/PageSection'
import RoundedImage from '../../components/RoundedImage'
import DonationForm from '../../components/DonationForm'
import {
  AMOUNT,
  PAYMENT_INTERVAL,
  PROJECT_ID,
} from '../../components/DonationForm/constants/fieldNames'
import { LEARN_4_LIFE_PROJECT_ID } from '../../components/DonationForm/constants/formValues'
import withQueryParams from '../../components/withQueryParams'

const Image = RoundedImage.extend`
  width: 100%;
`

const changeAmountValueOnPaymentInterval = createDecorator({
  field: PAYMENT_INTERVAL,
  updates: {
    [AMOUNT]: () => undefined,
  },
})

const BecomeSponsor = ({
  metaTitle,
  metaDescription,
  title,
  introSubtitle1,
  introMarkdown1,
  introSubtitle2,
  introMarkdown2,
  image,
  donationFormTitle,
  section2Title,
  section2ReferenceList,
  section3Title,
  section3ReferenceList,
  section4Title,
  section5Title,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
  minimumYearlyAmount,
  query,
}) => (
  <Fragment>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{title}</h1>
    </PageSection>

    <PageSection>
      <div className="row">
        <div className="col-12 col-md-7">
          <h3>{introSubtitle1}</h3>
          <Markdown source={introMarkdown1} />
          <h3>{introSubtitle2}</h3>
          <Markdown source={introMarkdown2} />
        </div>
        <div className="col-12 col-md-5">
          <Image src={image.url} alt={image.title} />
        </div>
      </div>
    </PageSection>

    <PageSection>
      <h2>{donationFormTitle}</h2>
    </PageSection>
    <DonationForm
      amounts={section3ReferenceList}
      amountTitle={section3Title}
      formTitle={section4Title}
      fundraisingboxIframeTitle={section5Title}
      fundraisingboxFormHash="pr9pjwm89abksr2y"
      intervals={section2ReferenceList}
      intervalTitle={section2Title}
      decorators={[changeAmountValueOnPaymentInterval]}
      initialValues={{
        [PROJECT_ID]: LEARN_4_LIFE_PROJECT_ID,
      }}
      minimumYearlyAmount={minimumYearlyAmount.toString()}
      iframeStatus={query && query.status}
    />

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </Fragment>
)

BecomeSponsor.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introSubtitle1: PropTypes.string.isRequired,
  introMarkdown1: PropTypes.string.isRequired,
  introSubtitle2: PropTypes.string.isRequired,
  introMarkdown2: PropTypes.string.isRequired,
  image: PropTypes.shape(imagePropTypes).isRequired,
  donationFormTitle: PropTypes.string.isRequired,
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
  section5Title: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  minimumYearlyAmount: PropTypes.number.isRequired,
  query: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

BecomeSponsor.defaultProps = {
  metaDescription: undefined,
}

BecomeSponsor.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeASponsorPage(getLocaleFromQuery(query))
}

export default withQueryParams(withLayout(BecomeSponsor))
