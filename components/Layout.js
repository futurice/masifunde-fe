import Head from 'next/head';
import Header from './Header';

const Layout = (props) => (
  <div>
    <Head>
      <title>Masifunde</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
    </Head>
    <Header />
    {props.children}
  </div>
);

export default Layout;
