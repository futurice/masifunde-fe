import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';
import { getWieSieHelfenIntro } from '../api/contentGetter'


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

const topRowStyle = {
  marginBottom: "100",
  backgroundColor: "Gainsboro"
}

const colOvalStyle = {
  textAlign: "right"
}

const titleStyle = {
  marginTop: "50",
  marginBottom: "50"
}

const Howtohelp = (props) => (
  <Layout activePage="you">
    <Container>
      <Row style={topRowStyle}>
        {/* Section intro part */}
        <Col xs="1" sm="1" md="1" lg="1" xl="1"/>
        <Col xs="6" sm="6" md="6" lg="6" xl="6" style={titleStyle}>
          <h2>{props.intro.title}</h2>
        </Col>
        <Col xs="5" sm="5" md="5" lg="5" xl="5"/>
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
          <Button color='primary' style={buttonStyle}>Learn about becoming a volunteer</Button>
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

Howtohelp.getInitialProps = async function() {
  const resultJSON = await getWieSieHelfenIntro()
  console.log("Result:", resultJSON)
  return { intro: resultJSON }
}

export default Howtohelp;
