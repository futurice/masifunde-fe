/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'

import { RouteNames } from '../../routes'
import NavigationLink from './NavigationLink'
import ButtonLink from './ButtonLink'

const containerStyle = {
  marginTop: 20,
  marginBottom: 20,
}

class Navigation extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  render() {
    return (
      <Container style={containerStyle}>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">
            <Link href="/">
              <img src="../static/Masifunde-Logo.png" alt="Masifunde Logo" />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavigationLink href={RouteNames.WhatWeDo}>Was wir machen</NavigationLink>
              <NavigationLink href={RouteNames.WhoWeAre}>Wer wir sind</NavigationLink>
              <NavigationLink href={RouteNames.HowToSupport}>Wie Sie helfen</NavigationLink>
              <ButtonLink href={RouteNames.Donate}>Spenden</ButtonLink>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export default Navigation
