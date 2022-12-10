import PropTypes from 'prop-types'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import { getLayoutProps } from '../../../components/Layout'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TeamMemberList from '../../../components/shared/TeamMemberList'
import { fetchTeamSaPage } from '../../../content/wer-wir-sind-content'
import imagePropTypes from '../../../propTypes/image'
import { smallSpacing } from '../../../styling/sizes'

const Image = styled.img`
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  margin-top: ${smallSpacing};
  margin-bottom: ${smallSpacing};
`

const TeamSa = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  introImage,
  teamMembers,
  bannerButtonText,
  bannerTitle,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <ImageContainer>
        <Image
          className="col-sm-7 col-md-6 col-lg-5"
          src={introImage.url}
          alt={introImage.title}
        />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <TeamMemberList
        members={teamMembers}
        title={(member) => member.name}
        subtitle={(member) => member.responsibilityArea}
        imageUrl={(member) => member.image.url}
      />
    </PageSection>

    <Banner
      buttonLink={bannerButtonUrl}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

TeamSa.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  introImage: PropTypes.shape(imagePropTypes).isRequired,
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.shape(imagePropTypes).isRequired,
      responsibilityArea: PropTypes.string,
    })
  ).isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

TeamSa.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchTeamSaPage(locale)),
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

export default TeamSa
