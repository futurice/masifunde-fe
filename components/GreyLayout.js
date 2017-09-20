import Head from 'next/head';

const pageStyle = {
  backgroundColor: 'grey',
}


const GreyLayout = (props) => (
  <div style={pageStyle}>
    <Head>
      <title>Masifunde</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
    </Head>
    {props.children}
  </div>
);

export default GreyLayout;