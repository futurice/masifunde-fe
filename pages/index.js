import Link from 'next/link';
import Layout from '../components/Layout';

const Index = (props) => (
  <Layout>
    <h1>Masifunde</h1>
    <p>{props.text}</p>
  </Layout>
);

Index.getInitialProps = async function() {
  return {
    text: 'dummy text'
  };
}

export default Index;
