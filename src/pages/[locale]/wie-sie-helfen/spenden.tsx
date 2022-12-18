import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import CenteredText from '../../../components/shared/CenteredText'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import DonationForm from '../../../components/wie-sie-helfen/DonationForm'
import FormContainer from '../../../components/wie-sie-helfen/DonationForm/FormContainer'
import { PROJECT_ID } from '../../../components/wie-sie-helfen/DonationForm/constants/fieldNames'
import { SA_PROJECT_ID } from '../../../components/wie-sie-helfen/DonationForm/constants/formValues'
import {
  DonateContent,
  getDonateContent,
} from '../../../content/wie-sie-helfen-content'
import { extraSmallSpacing } from '../../../styling/sizes'
import useGuaranteedPath from '../../../utils/useGuaranteedPath'
import useURLSearchParams from '../../../utils/useURLSearchParams'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & DonateContent

// Helpers
// =======

const MainHeading = styled.h1`
  width: 100%;
`

const MarkdownWithCustomList = styled(Markdown)`
  ul {
    list-style-image: url('/static/images/bullet-check.svg');

    li {
      margin-top: ${extraSmallSpacing};
    }
  }
`

// Component
// =========

const Donate: FC<Props> = ({
  bannerButtonText,
  bannerButtonUrl,
  bannerTitle,
  introHeading,
  introMarkdown,
  intro2Markdown,
  metaDescription,
  metaTitle,
  section1MarkdownDe,
  section1MarkdownSa,
  section1title,
  section2ReferenceList,
  section2title,
  section3ReferenceList,
  section3Text,
  section3Title,
  section4Title,
  section5Title,
}) => {
  // WORKAROUND: Currently, the "Einbettungsaddresse" ("embedding URL")
  // configured in Fundraisingbox does not have a locale prefix. To make
  // sure that the Fundraising iframe loads, we need to redirect to the
  // locale-less path so that the browser URL matches the iframe's
  // expectations.
  useGuaranteedPath('/wie-sie-helfen/spenden')

  const urlSearchParams = useURLSearchParams()
  const iframeStatus = urlSearchParams.get('status')

  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <MainHeading>{introHeading}</MainHeading>
        <CenteredText source={introMarkdown} />
      </PageSection>

      <FormContainer>
        <MarkdownWithCustomList source={intro2Markdown} />
      </FormContainer>

      <DonationForm
        amounts={section3ReferenceList}
        amountTitle={section3Title}
        buttonProjectDeText={section1MarkdownDe}
        buttonProjectSaText={section1MarkdownSa}
        formTitle={section4Title}
        fundraisingboxIframeTitle={section5Title}
        fundraisingboxFormHash="j3ip42zwp3mlewb9"
        intervals={section2ReferenceList}
        intervalTitle={section2title}
        otherAmountPlaceholder={section3Text}
        projectHeadline={section1title}
        initialValues={{
          [PROJECT_ID]: SA_PROJECT_ID,
        }}
        enableProjectSelection
        enableOtherAmount
        iframeStatus={iframeStatus}
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
      ...(await getDonateContent(locale)),
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

export default Donate
