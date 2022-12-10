import PropTypes from 'prop-types'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import { getLayoutProps } from '../../../components/Layout'
import PartnersList from '../../../components/PartnersList'
import { propTypes as partnerPropTypes } from '../../../components/PartnersList/Partner'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TextWithPortraitPhoto from '../../../components/shared/TextWithPortraitPhoto'
import { fetchBecomeAPartnerPage } from '../../../content/wie-sie-helfen-content'
import imagePropTypes from '../../../propTypes/image'

const BecomePartner = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  partners,
  section1Title,
  section1Markdown,
  teamMember,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <PartnersList partnersList={partners} />
    </PageSection>

    <PageSection>
      <TextWithPortraitPhoto
        header={section1Title}
        text={section1Markdown}
        portraitPhotoTitle={teamMember.name}
        portraitPhotoSubtitle={teamMember.responsibilityArea}
        portraitPhotoImageUrl={teamMember.image.url}
        portraitPhotoEmail={teamMember.email}
      />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

BecomePartner.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape(partnerPropTypes)).isRequired,
  teamMember: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: imagePropTypes.isRequired,
    responsibilityArea: PropTypes.string.isRequired,
  }).isRequired,
}

BecomePartner.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchBecomeAPartnerPage(locale)),
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

export default BecomePartner
