import React from 'react'

import withLayout from '../../components/withLayout'
import Head from '../../components/Head'
import PageSection from '../../components/PageSection'
import Link from '../../components/Link'
import { RouteNames } from '../../routes'

/* eslint-disable jsx-a11y/anchor-is-valid */
const Blog = () => (
  <div>
    <Head title="FIXME" description="FIXME" />

    <PageSection>
      <h1>FIXME: BLOG</h1>

      <Link
        route={RouteNames.BlogPost}
        params={{ slug: 'weltwaerts-in-suedafrika-jeden-tag-habe-ich-etwas-neues-gelernt' }}
      >
        <a>FIXME: A blog post</a>
      </Link>
    </PageSection>
  </div>
)

Blog.propTypes = {
}

Blog.defaultProps = {
}

Blog.getInitialProps = async function initialProps() {
  return {}
}

export default withLayout(Blog)
