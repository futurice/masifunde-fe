/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'

import NavigatoinLink from './NavigationLink'
import ButtonLink from './ButtonLink'

const containerStyle = {
  marginTop: 20,
  marginBottom: 20,
}

const links = {
  textAlign: 'right',
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
          <Collapse isOpen={this.state.isOpen} navbar style={links}>
            <Nav className="ml-auto" navbar>
              <NavigatoinLink href="/waswirmachen">Was wir machen</NavigatoinLink>
              <NavigatoinLink href="/about">Wer wir sind</NavigatoinLink>
              <NavigatoinLink href="/howtohelp">Wie Sie helfen</NavigatoinLink>
              <ButtonLink href="/donate">Spenden</ButtonLink>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export default Navigation
