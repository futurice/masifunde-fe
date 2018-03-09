import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { rem } from '../../styling/typography'
import withLayout from '../../components/withLayout'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import CenteredText from '../../components/CenteredText'
import TeamMember from '../../components/TeamMember'
import RoundedImage from '../../components/RoundedImage'
import Markdown from '../../components/Markdown'
import { fetchCampaignPage } from '../../api/campaign'
import withQueryParams from '../../components/withQueryParams'
import DonationForm from '../../components/DonationForm'
import imagePropTypes from '../../propTypes/image'
import teamMemmberPropTypes from '../../propTypes/teamMember'

const StyledRoundedImage = RoundedImage.extend`
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
  amountHeading,
  amounts,
  formHeading,
  fundraisingboxIframeHeading,
  query,
}) => (
  <Fragment>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introMarkdown} />
    </PageSection>

    <div className="container">
      <div className="row">
        <div className="offset-lg-1 col-lg-10">
          <PageSection>
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

          <PageSection>
            <TeamMemberHeadline>{teamMemberHeading}</TeamMemberHeadline>
            <div>
              <TeamMember
                imageUrl={teamMember.image.url}
                title={teamMember.name}
                email={teamMember.email}
              />
            </div>
          </PageSection>
        </div>
      </div>
    </div>

    <DonationForm
      amounts={amounts}
      amountTitle={amountHeading}
      formTitle={formHeading}
      fundraisingboxIframeTitle={fundraisingboxIframeHeading}
      fundraisingboxFormHash="vm0g01lokj4l5e58"
      iframeStatus={query && query.status}
      disableIntervalSelection
      enableOtherAmount
    />
  </Fragment>
)

Campaign.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  imageList: PropTypes.arrayOf(PropTypes.shape(imagePropTypes)).isRequired,
  contentMarkdown: PropTypes.string.isRequired,
  teamMemberHeading: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemmberPropTypes).isRequired,
  amountHeading: PropTypes.string.isRequired,
  amounts: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  formHeading: PropTypes.string.isRequired,
  fundraisingboxIframeHeading: PropTypes.string.isRequired,
  query: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

Campaign.defaultProps = {
  metaDescription: '',
}

Campaign.getInitialProps = async function initialProps({ query }) {
  return fetchCampaignPage(getLocaleFromQuery(query))
}

export default withQueryParams(withLayout(Campaign))
