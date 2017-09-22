import Head from 'next/head';
import Header from './Header';
import Navigation from './Navigation'
import Footer from './Footer'

const Layout = (props) => (
  <div>
    <Head>
      <title>Masifunde</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
    </Head>
    <Navigation activePage={props.activePage}/>
    {props.children}
    <Footer />
  </div>
);

export default Layout;
