import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

import LayoutWrapper from '../../components/LayoutWrapper'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import { fetchDatenschutzPage } from '../../api/datenschutz'
import Markdown from '../../components/Markdown'

const Datenschutz = ({
  metaTitle,
  metaDescription,
  datenschutzTitle,
  datenschutzMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <h1>{datenschutzTitle}</h1>
      <Markdown source={datenschutzMarkdown} />
    </Container>
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

export default LayoutWrapper(Datenschutz)
