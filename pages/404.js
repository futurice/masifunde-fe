import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLayoutProps } from '../components/Layout'
import Head from '../components/Head'
import Banner from '../components/Banner'
import PageSection from '../components/PageSection'
import Markdown from '../components/Markdown'
import { fetchErrorPage404 } from '../api/404'

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

const ErrorPage404 = ({
  bannerButtonText,
  bannerButtonUrl,
  bannerTitle,
  metaTitle,
  section1Markdown,
  section1Title,
}) => (
  <>
    <Head title={metaTitle} />

    <PageSection>
      <h1>{section1Title}</h1>
      <StyledMarkdown source={section1Markdown} />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </>
)

ErrorPage404.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  bannerButtonUrl: PropTypes.string.isRequired,
}

export async function getStaticProps() {
  return {
    // We cannot get the `locale` query parameter in `getStaticProps()`.
    // Use only the German version for now.
    props: {
      ...(await getLayoutProps('de')),
      ...(await fetchErrorPage404('de')),
    },
  }
}

export default ErrorPage404
