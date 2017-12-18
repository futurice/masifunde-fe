/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'

import { fetchImpressumPage } from '../../api/impressum'
import { getLocaleFromQuery } from '../../utils/locale'
import LayoutWrapper from '../../components/LayoutWrapper'
import Head from '../../components/Head'
import Markdown from '../../components/Markdown'

const Impressum = ({
  metaTitle,
  metaDescription,
  impressumTitle,
  impressumMarkdown,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <h1>{impressumTitle}</h1>
      <Markdown source={impressumMarkdown} />
    </Container>
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

Impressum.getInitialProps = async function getInitialProps({ query }) {
  return fetchImpressumPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(Impressum)
