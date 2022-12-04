import styled from 'styled-components'
import PropTypes from 'prop-types'

import { rem } from '../../styling/typography'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import TeamMember from '../../components/TeamMember'
import RoundedImage from '../../components/RoundedImage'
import Markdown from '../../components/Markdown'
import { fetchCampaignPage } from '../../content/campaign'
import DonationForm from '../../components/DonationForm'
import imagePropTypes from '../../propTypes/image'
import teamMemmberPropTypes from '../../propTypes/teamMember'
import CenteredGrid from '../../components/CenteredGrid'
import { getLayoutProps } from '../../components/Layout'
import useURLSearchParams from '../../utils/useURLSearchParams'

const StyledRoundedImage = styled(RoundedImage)`
  margin-bottom: 1rem;
  display: block;
`

const TeamMemberHeadline = styled.div`
  margin-bottom: 0.5rem;
  font-size: ${rem('18px')};
`

const Campaign = ({
  metaTitle,
  metaDescription,
  introHeading,
  introMarkdown,
  imageList,
  contentMarkdown,
  teamMemberHeading,
  teamMember,
  section2Title,
  section2ReferenceList,
  amountHeading,
  amounts,
  formHeading,
  fundraisingboxIframeHeading,
}) => {
  const urlSearchParams = useURLSearchParams()

  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <h1>{introHeading}</h1>
        <CenteredText source={introMarkdown} />
      </PageSection>

      <CenteredGrid>
        <PageSection contained={false}>
          <div className="row">
            <div className="col-md">
              {imageList.map(({ url, title }) => (
                <StyledRoundedImage
                  className="img-fluid"
                  key={url}
                  src={url}
                  alt={title}
                />
              ))}
            </div>
            <div className="col-md">
              <Markdown source={contentMarkdown} />
            </div>
          </div>
        </PageSection>

        <PageSection contained={false}>
          <TeamMemberHeadline>{teamMemberHeading}</TeamMemberHeadline>
          <div>
            <TeamMember
              imageUrl={teamMember.image.url}
              title={teamMember.name}
              email={teamMember.email}
            />
          </div>
        </PageSection>
      </CenteredGrid>

      <DonationForm
        amounts={amounts}
        amountTitle={amountHeading}
        formTitle={formHeading}
        fundraisingboxIframeTitle={fundraisingboxIframeHeading}
        fundraisingboxFormHash="vm0g01lokj4l5e58"
        iframeStatus={urlSearchParams.get('status')}
        disableIntervalSelection={!section2ReferenceList.length}
        intervals={section2ReferenceList}
        intervalTitle={section2Title}
        enableOtherAmount
      />
    </>
  )
}

Campaign.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape(imagePropTypes)).isRequired,
  contentMarkdown: PropTypes.string.isRequired,
  teamMemberHeading: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemmberPropTypes).isRequired,
  section2Title: PropTypes.string.isRequired,
  section2ReferenceList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  amountHeading: PropTypes.string.isRequired,
  amounts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  formHeading: PropTypes.string.isRequired,
  fundraisingboxIframeHeading: PropTypes.string.isRequired,
}

Campaign.defaultProps = {
  metaDescription: '',
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchCampaignPage(locale)),
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

export default Campaign
