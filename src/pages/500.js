import PropTypes from 'prop-types'
import styled from 'styled-components'

import { getLayoutProps } from '../components/Layout'
import Head from '../components/shared/Head'
import PageSection from '../components/shared/PageSection'
import Markdown from '../components/shared/Markdown'
import { fetchErrorPage500 } from '../content/500-content'

const StyledMarkdown = styled(Markdown)`
  text-align: center;
`

const ErrorPage500 = ({ metaTitle, title, descriptionMarkdown }) => (
  <>
    <Head title={metaTitle} />

    <PageSection>
      <h1>{title}</h1>
      <StyledMarkdown source={descriptionMarkdown} />
    </PageSection>
  </>
)

ErrorPage500.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  descriptionMarkdown: PropTypes.string.isRequired,
}

export async function getStaticProps() {
  return {
    // We cannot get the `locale` query parameter in `getStaticProps()`.
    // Use only the German version for now.
    props: {
      ...(await getLayoutProps('de')),
      ...(await fetchErrorPage500('de')),
    },
  }
}

export default ErrorPage500