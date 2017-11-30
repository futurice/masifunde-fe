import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeAVolunteerPage } from '../../api/howToSupport'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import TeamMember from '../../components/TeamMember'
import Markdown from '../../components/Markdown'
import RegionalGroups from '../../components/RegionalGroups'

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const BecomeVolunteer = ({
  metaTitle,
  metaDescription,
  introTitle,
  section1Title,
  section1Markdown,
  section1TeamMember,
  section2Title,
  volunteerOpenings,
  section3Title,
  section3Markdown,
  regionalGroups,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Hero imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <h2>{introTitle}</h2>
      <div className="row">
        <div className="col-md-9">
          <h3>{section1Title}</h3>
          <Markdown source={section1Markdown} />
        </div>
        <TeamMember
          className="col-md-3"
          imageUrl={section1TeamMember.image.url}
          title={section1TeamMember.region}
          subtitle={section1TeamMember.name}
          email={section1TeamMember.email}
        />
      </div>
      <h2>{section2Title}</h2>
      <div className="row">
        {volunteerOpenings.map(opening => (
          <div className="col-md-4" key={opening.description}>
            <h3>{opening.title}</h3>
            <Markdown source={opening.description} />
          </div>
        ))}
      </div>
      <h2>{section3Title}</h2>
      <CenteredMarkdown source={section3Markdown} />
      <RegionalGroups regionalGroups={regionalGroups} />
    </Container>
    <Banner headline={bannerTitle} buttonText={bannerButtonText} buttonLink="a" />
  </div>
)

BecomeVolunteer.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeAVolunteerPage(getLocaleFromQuery(query))
}

BecomeVolunteer.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  section1TeamMember: PropTypes.shape().isRequired,
  section2Title: PropTypes.string.isRequired,
  volunteerOpenings: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  section3Title: PropTypes.string.isRequired,
  section3Markdown: PropTypes.string.isRequired,
  regionalGroups: PropTypes.shape().isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
}

BecomeVolunteer.defaultProps = {
  metaDescription: undefined,
}

export default LayoutWrapper(BecomeVolunteer)

