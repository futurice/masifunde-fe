import React from 'react'
import PropTypes from 'prop-types'

import withLayout from '../../components/withLayout'
import { getLocaleFromQuery } from '../../utils/locale'
import Head from '../../components/Head'
import { fetchTransparenzPage } from '../../api/transparency'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'

const Transparenz = ({
  metaTitle,
  metaDescription,
  heading,
  markdown,
}) => (
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

Transparenz.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  heading: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
}

Transparenz.defaultProps = {
  metaDescription: undefined,
}

Transparenz.getInitialProps = async function initialProps({ query }) {
  return fetchTransparenzPage(getLocaleFromQuery(query))
}

export default withLayout(Transparenz)
