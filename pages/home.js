/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import { Button, Container, Row } from 'reactstrap'
import Layout from '../components/Layout'
import { getAuthorTeamMembers } from '../api/contentGetter'

const Index = props => (
  <Layout>
    <Container>
      <Row>Some text</Row>

      <h1>{props.title}</h1>
      <p>{props.text}</p>
      <Button color="danger">I am a Reactstrap button</Button>

      <br />
      <Link href="/donate">DONATE</Link>
      <br />

      <p>Content types:</p>
      <p />
    </Container>
  </Layout>
)

Index.getInitialProps = async function getInitialProps() {
  const resultJSON = await getAuthorTeamMembers()

  console.log('Result:', resultJSON)

  return resultJSON
}

export default Index
