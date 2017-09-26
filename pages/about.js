import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';
import Layout from '../components/Layout';
import { getAboutFields } from '../api/contentGetter'

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

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
}

const contactStyle = {
  fontSize: 16,
  position: "relative",
  width: "100%",
  background: "#d8d8d8",
  paddingTop: 50,
  paddingBottom: 50,
  paddingLeft: 200,
  paddingRight: 200,
  height: 220,
  marginTop: 80,
  textAlign: "center",
  verticalAlign: "middle"
}

const footerTitle = {
  fontSize: 32,
  marginBottom: 30,
}


const About = (props) => (
  <Layout activePage="we">
    <Container>
      <Row>
        <Col style={titleStyle}><h1>{props.title}</h1></Col>
      </Row>
      <Row>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
        <Col xs="8" sm="8" md="8" lg="8" xl="8"><center><p>{props.subtitle}</p></center></Col>
        <Col xs="2" sm="2" md="2" lg="2" xl="2"/>
      </Row>
      <Row>
        <Col style={paragraphTitleStyle}><h2>{props.paragraphOneTitle}</h2></Col>
      </Row>
      <Row>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
        <Col xs="6" sm="6" md="6" lg="6" xl="6"><center><p>{props.paragraphOneText}</p></center></Col>
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
      <Row><Col style={paragraphTitleStyle}><h2>{props.paragraphTwoTitle}</h2></Col></Row>
      <Row>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
        <Col xs="6" sm="6" md="6" lg="6" xl="6"><center><p>{props.paragraphTwoText}</p></center></Col>
        <Col xs="3" sm="3" md="3" lg="3" xl="3"/>
      </Row>
      <Row><Col><img src={props.partnersImageUrl} /></Col></Row>
      <Row><Col><center><Button color='primary' style={buttonStyle}>Unternehmenspartner werden</Button></center></Col></Row>
    </Container>

    <div style={contactStyle}>
      <div style={footerTitle}><b >Unsere Geschichte</b></div>
      <div><Link href="/"><a><Button color='primary' style={buttonStyle}>Masifundes Gründung und Entwicklung</Button></a></Link></div>
    </div>

  </Layout>
);

About.getInitialProps = async function() {
  const resultJSON = await getAboutFields()

  console.log("Result:", resultJSON)

  return resultJSON
}

export default About;
