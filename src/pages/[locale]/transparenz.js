import PropTypes from 'prop-types'

import { getLayoutProps } from '../../components/Layout'
import Head from '../../components/Head'
import { fetchTransparenzPage } from '../../content/transparency'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'

const Transparency = ({ metaTitle, metaDescription, heading, markdown }) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{heading}</h1>
      <div className="row">
        <Markdown className="offset-lg-1 col-lg-10" source={markdown} />
      </div>
    </PageSection>
  </div>
)

Transparency.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heading: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
}

Transparency.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchTransparenzPage(locale)),
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

export default Transparency
