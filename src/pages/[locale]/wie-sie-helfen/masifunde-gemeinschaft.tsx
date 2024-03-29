import createDecorator from 'final-form-calculate'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import RoundedImage from '../../../components/shared/RoundedImage'
import DonationForm from '../../../components/wie-sie-helfen/DonationForm'
import {
  AMOUNT,
  PAYMENT_INTERVAL,
  PROJECT_ID,
} from '../../../components/wie-sie-helfen/DonationForm/constants/fieldNames'
import { LEARN_4_LIFE_PROJECT_ID } from '../../../components/wie-sie-helfen/DonationForm/constants/formValues'
import {
  BecomeSponsorContent,
  getBecomeSponsorContent,
} from '../../../content/wie-sie-helfen-content'
import useURLSearchParams from '../../../utils/useURLSearchParams'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & BecomeSponsorContent

// Helpers
// =======

const Image = styled(RoundedImage)`
  width: 100%;
`

const changeAmountValueOnPaymentInterval = createDecorator({
  field: PAYMENT_INTERVAL,
  updates: {
    [AMOUNT]: () => undefined,
  },
})

// Component
// =========

const BecomeSponsor: FC<Props> = ({
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
            <Image src={image.file.url} alt={image.title} />
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

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getBecomeSponsorContent(locale)),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
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
