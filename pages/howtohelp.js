import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';


import Layout from '../components/Layout';
import * as api from '../api/contentful';

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
  cursor: 'pointer',
}

const ovalStyle = {
  width: "100",
  height: "100",
}

const rowStyle = {
  marginTop: "10",
  marginBottom: "100",
}

const colOvalStyle = {
  textAlign: "center"
}

const Howtohelp = (props) => (
  <Layout activePage="you">
    <Container>
      <Row style={rowStyle}>
        {/* Section intro part */}
      </Row>
      <Row style={rowStyle}>
        {/* Financial support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}><img src="../static/oval4.svg" style={ovalStyle}/></Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>Finanzielle Unterstützung</h1>
          <p>Über Ihren Beitrag zu unseren Bildungsangeboten eröffnen Sie Kindern und Jugendlichen Zukunftschancen, die ihnen sonst nicht zukämen.</p>
          <Button color='primary' style={buttonStyle}>Spenden</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
      <Row style={rowStyle}>
        {/* Volunteer support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}><img src="../static/oval4.svg" style={ovalStyle}/></Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>Ehrenamtliche Unterstützung</h1>
          <p>Möchtest du dich für gerechte Bildungschancen für Kinder und Jugendliche in Walmer Township einsetzen? Unser Team in Deutschland basiert auf dem ehrenamtlichen Engagement zahlreicher junger Berufstätiger, Studenten und Schüler in der ganzen Republik.</p>
          <Button color='primary' style={buttonStyle}>Learn about becoming a vlunteer</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
      <Row style={rowStyle}>
        {/* Institutional support part */}
        <Col xs="3" sm="3" md="3" lg="3" xl="3" style={colOvalStyle}><img src="../static/oval4.svg" style={ovalStyle}/></Col>
        <Col xs="7" sm="7" md="7" lg="7" xl="7">
          <h1>Institutionelle Unterstützung</h1>
          <p>Die Möglichkeiten, einen Beitrag für gerechtere Bildungschancen und die Bekämpfung der Armut in Walmer Township zu leisten, sind vielfältig. Als Unternehmen oder Abteilung aktiv zu werden ist ganz einfach.</p>
          <Button color='primary' style={buttonStyle}>Unternehmenspartner werden</Button>
        </Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
    </Container>
  </Layout>
);

export default Howtohelp;
