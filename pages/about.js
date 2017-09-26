import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';


import Layout from '../components/Layout';
import * as api from '../api/contentful';

const silhouetteStyle = {
  color: 'black',
  fill: 'currentColor',
  marginLeft: 50,
  marginRight: 50,
  marginTop: 80,
  marginBottom: 80,
}

const titleStyle = {
  marginTop: 70,
  marginBottom: 30,
  textAlign: 'center'
}

const paragraphTitleStyle = {
  marginTop: 90,
  marginBottom: 20,
  textAlign: 'center'
}



const About = (props) => (
  <Layout activePage="we">
    <Container>
      <Row>
        <Col style={titleStyle}><h1>Masifunde Bildungsförderung e.V. ist eine Nichtregierungsorganisation, die sich für Bildungs- und Chancengerechtigkeit in Südafrika einsetzt.</h1></Col>
      </Row>
      <Row>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
        <Col xs="8" sm="8" md="8" lg="8" xl="8"><center><p>Wir machen keine Lobbyarbeit, sondern packen an und unterrichten Kinder und Jugendliche in Port Elizabeth, Südafrika.</p></center></Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
      <Row>
        <Col style={paragraphTitleStyle}><h2>Engagement in Deutschland für Südafrika</h2></Col>
      </Row>
      <Row>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
        <Col xs="6" sm="6" md="6" lg="6" xl="6"><center><p>Zahlreiche junge Berufstätige, Studente und Schüler in der ganzen Republik engagieren sich für Masifunde. Sie kümmern sich um das Fundraising und sensibilisieren andere für die Bedeutung von Bildungsarbeit. In Südafrika beschäftigen wir, finanziert durch Spendengelder, festangestellte Lehrer und Pädagogen.</p></center></Col>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
      </Row>
      <Row>
        <Col>
          <center>
            <img src="../static/de-silhouette.svg" style={silhouetteStyle}/>
            <img src="../static/sa-silhouette.svg" style={silhouetteStyle}/>
          </center>
        </Col>
      </Row>
      <Row><Col style={paragraphTitleStyle}><h2>Unternehmenspartner</h2></Col></Row>
      <Row>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
        <Col xs="6" sm="6" md="6" lg="6" xl="6"><center><p>Insbesondere regelmäßige Spenden, wie z.B. von Unternehmensseite, geben Masifunde Planungssicherheit. Diese Unternehmen leisten einen Beitrag für gerechtere Bildungschancen und die Bekämpfung der Armut: </p></center></Col>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
      </Row>
      <Row><Col><img src="../static/partners.png" /></Col></Row>
    </Container>
  </Layout>
);

export default About;
