import PropTypes from 'prop-types'

import { fetchImpressumPage } from '../../content/impressum-content'
import Head from '../../components/shared/Head'
import { getLayoutProps } from '../../components/Layout'
import Markdown from '../../components/shared/Markdown'
import PageSection from '../../components/shared/PageSection'

const Impressum = ({
  metaTitle,
  metaDescription,
  impressumTitle,
  impressumMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{impressumTitle}</h1>
      <div className="row">
        <Markdown
          className="offset-lg-1 col-lg-10"
          source={impressumMarkdown}
        />
      </div>
    </PageSection>
  </div>
)

Impressum.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  impressumTitle: PropTypes.string.isRequired,
  impressumMarkdown: PropTypes.string.isRequired,
}

Impressum.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchImpressumPage(locale)),
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

export default Impressum
