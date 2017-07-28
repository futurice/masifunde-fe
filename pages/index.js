import Link from 'next/link';
import { Button } from 'reactstrap';

import Layout from '../components/Layout';
import * as api from '../api/contentful';

const Index = (props) => (
  <Layout>
    <h1>{props.title}</h1>
    <p>{props.text}</p>
    <Button color='danger'>I am a Reactstrap button</Button>
  </Layout>
);

Index.getInitialProps = async function() {
  const types = await api.getContentTypes();
  const type = types[0];

  const entries = await api.getEntriesForContentType(type);
  const newsItem = entries[0];

  return {
    title: newsItem.fields.title,
    text: newsItem.fields.text
  };
}

export default Index;
