import PropTypes from 'prop-types'
import styled from 'styled-components'

import Banner from '../../../components/Banner'
import Head from '../../../components/shared/Head'
import { fetchDonatePage } from '../../../content/wie-sie-helfen-content'
import { getLayoutProps } from '../../../components/Layout'
import DonationForm from '../../../components/DonationForm'
import PageSection from '../../../components/shared/PageSection'
import FormContainer from '../../../components/DonationForm/FormContainer'
import CenteredText from '../../../components/CenteredText'
import { SA_PROJECT_ID } from '../../../components/DonationForm/constants/formValues'
import { PROJECT_ID } from '../../../components/DonationForm/constants/fieldNames'
import Markdown from '../../../components/shared/Markdown'
import { extraSmallSpacing } from '../../../styling/sizes'
import useURLSearchParams from '../../../utils/useURLSearchParams'

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

const Donate = ({
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
  const urlSearchParams = useURLSearchParams()

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
        iframeStatus={urlSearchParams.get('status')}
      />

      <Banner
        headline={bannerTitle}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </>
  )
}

Donate.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  intro2Markdown: PropTypes.string.isRequired,
  section1title: PropTypes.string.isRequired,
  section1MarkdownDe: PropTypes.string.isRequired,
  section1MarkdownSa: PropTypes.string.isRequired,
  section2title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Text: PropTypes.string.isRequired,
  section3ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  section4Title: PropTypes.string.isRequired,
  section5Title: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  query: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

Donate.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchDonatePage(locale)),
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

export default Donate
