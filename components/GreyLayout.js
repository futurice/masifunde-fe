/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'

const pageStyle = {
  backgroundColor: 'grey',
}

const GreyLayout = props => (
  <div style={pageStyle}>
    <Head>
      <title>Masifunde</title>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0-beta/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Lato"
      />
    </Head>
    {props.children}
  </div>
)

export default GreyLayout
