import createDecorator from 'final-form-calculate'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import DonationForm from '../../../components/DonationForm'
import {
  AMOUNT,
  PAYMENT_INTERVAL,
  PROJECT_ID,
} from '../../../components/DonationForm/constants/fieldNames'
import { LEARN_4_LIFE_PROJECT_ID } from '../../../components/DonationForm/constants/formValues'
import { getLayoutProps } from '../../../components/Layout'
import RoundedImage from '../../../components/RoundedImage'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import { fetchBecomeASponsorPage } from '../../../content/wie-sie-helfen-content'
import imagePropTypes from '../../../propTypes/image'
import useURLSearchParams from '../../../utils/useURLSearchParams'

const Image = styled(RoundedImage)`
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
}) => {
  const searchParams = useURLSearchParams()

  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <h1>{title}</h1>

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
        iframeStatus={searchParams.get('status')}
      />

      <Banner
        headline={bannerTitle}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </>
  )
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
  donationFormTitle: PropTypes.string.isRequired,
  section2Title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
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

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchBecomeASponsorPage(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { locale: 'de' },
      },
      {
        params: { locale: 'en' },
      },
    ],
    fallback: false,
  }
}

export default BecomeSponsor
