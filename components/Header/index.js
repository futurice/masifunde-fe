/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'

import { RouteNames } from '../../routes'
import NavigationLink from './NavigationLink'
import ButtonLink from './ButtonLink'

const containerStyle = {
  marginTop: 20,
  marginBottom: 20,
}

class Header extends Component {
  state = {
    isOpen: false,
  }

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  render() {
    const {
      donateText, howToSupportText, whoWeAreText, whatWeDoText,
    } = this.props

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
              <NavigationLink href={RouteNames.WhatWeDo}>{whatWeDoText}</NavigationLink>
              <NavigationLink href={RouteNames.WhoWeAre}>{whoWeAreText}</NavigationLink>
              <NavigationLink href={RouteNames.HowToSupport}>{howToSupportText}</NavigationLink>
              <ButtonLink href={RouteNames.Donate}>{donateText}</ButtonLink>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export const propTypes = {
  whatWeDoText: PropTypes.string.isRequired,
  whoWeAreText: PropTypes.string.isRequired,
  howToSupportText: PropTypes.string.isRequired,
  donateText: PropTypes.string.isRequired,
}

Header.propTypes = propTypes

export default Header
