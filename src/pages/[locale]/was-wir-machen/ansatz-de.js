import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLayoutProps } from '../../../components/Layout'
import Head from '../../../components/Head'
import { fetchApproachDePage } from '../../../content/whatWeDo'
import Banner from '../../../components/Banner'
import Hero from '../../../components/Hero'
import PageSection from '../../../components/PageSection'
import Tagline from '../../../components/Tagline'
import ProjectList from '../../../components/ProjectList'
import CenteredText from '../../../components/CenteredText'
import imagePropTypes from '../../../propTypes/image'
import RoundedImage from '../../../components/RoundedImage'
import TextWithTeamMember from '../../../components/TextWithTeamMember'
import teamMemberShape from '../../../propTypes/teamMember'
import StatList from '../../../components/StatList'
import Stat from '../../../components/Stat'

const ImageContainer = styled.div`
  margin: 0 auto;
  max-width: 900px;
`

const ApproachDe = ({
  metaTitle,
  metaDescription,
  title,
  introHeading,
  introText,
  projects,
  image1,
  statsTitle,
  stats,
  bannerTitle,
  section1Title,
  section1Markdown,
  teamMember,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-library.jpg"
      heroSize="small"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introHeading}</h1>
      <CenteredText source={introText} />
      <ProjectList projects={projects} />
    </PageSection>

    <PageSection>
      <ImageContainer>
        <RoundedImage
          className="img-fluid"
          src={image1.url}
          alt={image1.title}
        />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <h2>{statsTitle}</h2>
      <StatList>
        {stats.map((stat, index) => (
          <Stat
            key={`${stat.number} ${stat.description}`}
            {...stat}
            superscriptText={index + 1}
            sourceId={`impact-source-${index}`}
          />
        ))}
      </StatList>
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
      buttonLink={bannerButtonUrl}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

ApproachDe.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introHeading: PropTypes.string.isRequired,
  introText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  projects: ProjectList.propTypes.projects,
  image1: PropTypes.shape(imagePropTypes).isRequired,
  statsTitle: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape(Stat.propTypes)).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  teamMember: PropTypes.shape(teamMemberShape).isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

ApproachDe.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchApproachDePage(locale)),
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

export default ApproachDe
