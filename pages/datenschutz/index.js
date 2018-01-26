import React from 'react'
import PropTypes from 'prop-types'

import withLayout from '../../components/withLayout'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import { fetchDatenschutzPage } from '../../api/datenschutz'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'

const Datenschutz = ({
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
        <Markdown className="offset-lg-1 col-lg-10" source={datenschutzMarkdown} />
      </div>
    </PageSection>
  </div>
)


Datenschutz.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  datenschutzTitle: PropTypes.string.isRequired,
  datenschutzMarkdown: PropTypes.string.isRequired,
}

Datenschutz.defaultProps = {
  metaDescription: undefined,
}

Datenschutz.getInitialProps = async function initialProps({ query }) {
  return fetchDatenschutzPage(getLocaleFromQuery(query))
}

export default withLayout(Datenschutz)
