import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

import WithHeaderAndFooterData from '../../components/WithHeaderAndFooterData'
import { propTypes as footerProps } from '../../components/Footer'
import { propTypes as headerProps } from '../../components/Header'
import Button from '../../components/Button'
import { RouteNames } from '../../routes'
import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import Banner from '../../components/Banner'
import { getAboutFields } from '../../api/contentGetter'

const Heading1 = styled.h1`
  text-align: center;
`

const Heading2 = styled.h2`
  text-align: center;
`

const Paragraph = styled.p`
  text-align: center;
`

const About = ({
  title,
  subtitle,
  paragraphOneTitle,
  paragraphOneText,
  paragraphTwoTitle,
  paragraphTwoText,
  footerData,
  headerData,
}) => (
  <Layout title="About page" headerData={headerData} footerData={footerData}>
    <Hero headline="Text" imageUrl="//via.placeholder.com/350x150/555" />
    <Container>
      <Row>
        <Col>
          <Heading1>{title}</Heading1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="8" xl="8">
          <Paragraph>{subtitle}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col>
          <Heading2>{paragraphOneTitle}</Heading2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="6" xl="6">
          <Paragraph>{paragraphOneText}</Paragraph>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="5" xl="5" className="d-flex flex-column align-items-center justify-content-center">
          <img className="img-fluid" src="../static/de-silhouette.svg" alt="" />
          <Button>Unternehmenspartner werden</Button>
        </Col>
        <Col lg="5" xl="5" className="d-flex flex-column align-items-center justify-content-center">
          <img className="img-fluid" src="../static/sa-silhouette.svg" alt="" />
          <Button>Unternehmenspartner werden</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Heading2>{paragraphTwoTitle}</Heading2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col lg="6" xl="6">
          <Paragraph>{paragraphTwoText}</Paragraph>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <Button>Unternehmenspartner werden</Button>
        </Col>
      </Row>
    </Container>

    <Banner
      headline="Unsere Geschichte"
      buttonText="Masifundes Gründung und Entwicklung"
      buttonLink={RouteNames.BecomeVolunteer}
    />
  </Layout>
)

About.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  paragraphOneTitle: PropTypes.string.isRequired,
  paragraphOneText: PropTypes.string.isRequired,
  paragraphTwoTitle: PropTypes.string.isRequired,
  paragraphTwoText: PropTypes.string.isRequired,
  headerData: PropTypes.shape(footerProps).isRequired,
  footerData: PropTypes.shape(headerProps).isRequired,
}

About.getInitialProps = async function initialProps() {
  const resultJSON = await getAboutFields()
  return resultJSON
}

export default WithHeaderAndFooterData(About)
