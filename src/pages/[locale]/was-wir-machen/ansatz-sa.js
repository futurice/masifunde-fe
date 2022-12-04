import PropTypes from 'prop-types'

import { fetchApproachSaPage } from '../../../content/whatWeDo'
import { getLayoutProps } from '../../../components/Layout'
import Hero from '../../../components/Hero'
import Head from '../../../components/Head'
import Banner from '../../../components/Banner'
import EmbeddedVideo from '../../../components/EmbeddedVideo'
import PageSection from '../../../components/PageSection'
import CenteredText from '../../../components/CenteredText'
import Tagline from '../../../components/Tagline'
import Markdown from '../../../components/Markdown'
import ProjectList from '../../../components/ProjectList'

const ApproachSa = ({
  metaTitle,
  metaDescription,
  title,
  introTitle,
  introMarkdown,
  projects,
  videoUrl,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
  outroTitle,
  outroMarkdown1,
  outroMarkdown2,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      imageUrl="/static/images/hero/hero-small-classroom.jpg"
      heroSize="small"
      backgroundPositionX="80%"
    />

    <Tagline text={title} hideTopRuler />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <ProjectList projects={projects} />
    </PageSection>

    <PageSection contained={false}>
      <EmbeddedVideo videoUrl={videoUrl} />
    </PageSection>

    <PageSection>
      <h2>{outroTitle}</h2>
      <div className="row">
        <Markdown className="col-md-6" source={outroMarkdown1} />
        <Markdown className="col-md-6" source={outroMarkdown2} />
      </div>
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

ApproachSa.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  videoUrl: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
  outroTitle: PropTypes.string,
  outroMarkdown1: PropTypes.string,
  outroMarkdown2: PropTypes.string,
}

ApproachSa.defaultProps = {
  metaDescription: undefined,
  outroTitle: '',
  outroMarkdown1: '',
  outroMarkdown2: '',
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchApproachSaPage(locale)),
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

export default ApproachSa
