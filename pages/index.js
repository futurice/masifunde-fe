import Link from 'next/link';
import Layout from '../components/Layout';
import { Button } from 'reactstrap';

const Index = (props) => (
  <Layout>
    <h1>Masifunde</h1>
    <p>{props.text}</p>
    <Button color='danger'>I am a Reactstrap button</Button>
  </Layout>
);

Index.getInitialProps = async function() {
  return {
    text: 'dummy text'
  };
}

export default Index;
