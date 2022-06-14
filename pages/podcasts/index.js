import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Container } from 'reactstrap'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import { getLocaleFromQuery } from '../../utils/locale'

import { fetchPodcastPage } from '../../api/podcast'
import { lgBreakpoint, smBreakpoint } from '../../styling/breakpoints'
import Divider from '../../components/Divider'
import PodcastListNavigationButtons from '../../components/Podcast/PodcastListNavigationButtons'
import Subscribe from '../../components/Podcast/Subscribe'
import Share from '../../components/Podcast/Share'
import PodcastList from '../../components/Podcast'
import teamMemberProps from '../../propTypes/teamMember'
import TextWithTeamMember from '../../components/TextWithTeamMember'
import Banner from '../../components/Banner'
import { largeSpacing , extraSmallSpacing } from '../../styling/sizes'

const PodcastSubHeading = styled.h2`
  text-align: center;
  color: #271b19;
  font-weight: normal;
  font-size: 1.1rem;
`

const PodcastMarkdown = styled.div`
  margin: 0 auto;
  text-align: left;

  @media (min-width: ${lgBreakpoint}) {
    width: 100%;
  }

  h1 + & {
    margin-top: -${extraSmallSpacing};
  }
`

const PodcastListFooter = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${lgBreakpoint}) {
    width: 60%;
  }
`

const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ExtendedDivider = Divider.extend`
  margin-top: ${largeSpacing} !important;
`

const SubscribeAndShare = styled.div`
  margin-top: 24px;
  display:inline-block;
  width:100%;
`

const PodcastSection = styled.div.attrs({ className: 'container' })`
  margin-top:3rem;

  @media (min-width: ${smBreakpoint}) {
    margin-top: 2rem;
  }
`

class Podcast extends Component {
  UNSAFE_componentWillReceiveProps(newProps, props) {
    if (newProps.page !== props.page) {
      this.resetFocus()
    }
  }

  resetFocus = () => document.activeElement.blur()

  render() {
    const {
      metaTitle,
      metaDescription,
      introHeading,
      introSubHeading,
      introMarkdown,
      subscribeText,
      subscribeLinks,
      shareText,
      shareLinks,
      podcast,
      previousPageButtonText,
      nextPageButtonText,
      page,
      isLastPage,
      totalNumberOfPages,
      contactTextHeading,
      contactText,
      teamMember,
      bannerTitle,
      bannerButtonText,
      bannerButtonUrl,
    } = this.props
    return (
      <div>
        <Head title={metaTitle} description={metaDescription} />
        <PageSection>
          <h1>{introHeading}</h1>
          <PodcastSubHeading>{introSubHeading}</PodcastSubHeading>
          <PodcastMarkdown> {introMarkdown} </PodcastMarkdown>
          <SubscribeAndShare>
            <Subscribe
              subscribeText={subscribeText}
              subscribeLinks={subscribeLinks}
            />
            <Share
              shareText={shareText}
              shareLinks={shareLinks}
            />
          </SubscribeAndShare>
        </PageSection>

        <PodcastSection>
          <PodcastList podcast={podcast} />
        </PodcastSection>


        <Container>
          <PodcastListFooter>
            <PodcastListNavigationButtons
              previousPageButtonText={previousPageButtonText}
              nextPageButtonText={nextPageButtonText}
              page={page}
              isLastPage={isLastPage}
              totalNumberOfPages={totalNumberOfPages}
            />
          </PodcastListFooter>
        </Container>

        <ExtendedDivider color="orange" />
        <PageSection>
          <TeamMemberContainer>
            <TextWithTeamMember
              header={contactTextHeading}
              text={contactText}
              teamMemberTitle={teamMember.name}
              teamMemberSubtitle={teamMember.responsibilityArea}
              teamMember={teamMember}
            />
          </TeamMemberContainer>
        </PageSection>

        <Banner
          headline={bannerTitle}
          buttonText={bannerButtonText}
          buttonLink={bannerButtonUrl}
        />

      </div>
    )
  }
}


Podcast.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introSubHeading: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  subscribeText: PropTypes.string.isRequired,
  subscribeLinks: PropTypes.object.isRequired,
  shareText: PropTypes.string.isRequired,
  shareLinks: PropTypes.object.isRequired,
  podcast: PodcastList.propTypes.podcast.isRequired,
  ...PodcastListNavigationButtons.propTypes,
  page: PropTypes.number.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  contactTextHeading: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemberProps).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,

}

Podcast.defaultProps = {
  podcast: [],
}

Podcast.getInitialProps = function initialProps({ query }) {
  const { page } = query
  return fetchPodcastPage(getLocaleFromQuery(query), page)
}

export default withLayout(Podcast)
