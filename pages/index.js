import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';
import Layout from '../components/Layout';
import { getAuthorTeamMembers, getEmployeeTeamMembers } from '../api/contentGetter'



const Index = (props) => (
  <Layout activePage="index">
    <Container>
      <Row>
        Some text
      </Row>
      <Row>
        <Col>
          <Row>{texts.mainTitle}</Row>
          <Row>{texts.mainText}</Row>
        </Col>
        <Col>
        </Col>
      </Row>

    <h1>{props.title}</h1>
    <p>{props.text}</p>
    <Button color='danger'>I am a Reactstrap button</Button>

    <p>Content types:</p>
    <p></p>

    </Container>
  </Layout>
);

// Index.getInitialProps = async function() {
//   const types = await api.getContentTypes();
//   const type = types[0];

//   const entries = await api.getEntriesForContentType(type);
//   const newsItem = entries[0];

//   return {
//     title: newsItem.fields.title,
//     text: newsItem.fields.text
//   };
// }


Index.getInitialProps = async function() {
  const resultJSON = await getAuthorTeamMembers()

  console.log("Result:", resultJSON)

  return resultJSON
}

export default Index;
