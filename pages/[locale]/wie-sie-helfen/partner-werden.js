import PropTypes from 'prop-types'

import { getLayoutProps } from '../../../components/Layout'
import Banner from '../../../components/Banner'
import Head from '../../../components/Head'
import { fetchBecomeAPartnerPage } from '../../../api/howToSupport'
import { propTypes as partnerPropTypes } from '../../../components/PartnersList/Partner'
import imagePropTypes from '../../../propTypes/image'
import PageSection from '../../../components/PageSection'
import PartnersList from '../../../components/PartnersList'
import CenteredText from '../../../components/CenteredText'
import TextWithTeamMember from '../../../components/TextWithTeamMember'

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
      <TextWithTeamMember
        header={section1Title}
        text={section1Markdown}
        teamMember={teamMember}
        teamMemberTitle={teamMember.name}
        teamMemberSubtitle={teamMember.responsibilityArea}
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
