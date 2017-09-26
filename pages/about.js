import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';


import Layout from '../components/Layout';
import * as api from '../api/contentful';

const About = (props) => (
  <Layout activePage="we">
    <Container>
      <Row>
        <Col>
          <h1>Masifunde Bildungsförderung e.V. ist eine Nichtregierungsorganisation, die sich für Bildungs- und Chancengerechtigkeit in Südafrika einsetzt.</h1>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  </Layout>
);

export default About;
