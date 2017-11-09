/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'

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
              <NavigationLink href="/what-we-do">Was wir machen</NavigationLink>
              <NavigationLink href="/who-we-are">Wer wir sind</NavigationLink>
              <NavigationLink href="/how-to-support">Wie Sie helfen</NavigationLink>
              <ButtonLink href="/donate">Spenden</ButtonLink>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export default Navigation
