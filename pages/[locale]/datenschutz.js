import React from 'react'
import PropTypes from 'prop-types'

import { getLayoutProps } from '../../components/Layout'
import Head from '../../components/Head'
import { fetchDatenschutzPage } from '../../api/datenschutz'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'

const Privacy = ({
  metaTitle,
  metaDescription,
  datenschutzTitle,
  datenschutzMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{datenschutzTitle}</h1>
      <div className="row">
        <Markdown
          className="offset-lg-1 col-lg-10"
          source={datenschutzMarkdown}
        />
      </div>
    </PageSection>
  </div>
)

Privacy.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  datenschutzTitle: PropTypes.string.isRequired,
  datenschutzMarkdown: PropTypes.string.isRequired,
}

Privacy.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps({ params: { locale } }) {
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchDatenschutzPage(locale)),
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

export default Privacy
