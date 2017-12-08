/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'
import styled from 'styled-components'

import { RouteNames } from '../../routes'
import NavigationLink from './NavigationLink'
import ButtonLink from './ButtonLink'

const HeaderWrapper = styled.div`
  background-color: #f4e3d6;
  padding-top: 20px;
  padding-bottom: 20px;
`

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
      <HeaderWrapper>
        <Container>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">
              <Link href="/">
                <img src="../static/logo.svg" alt="Masifunde Logo" />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto d-flex align-items-center" navbar>
                <NavigationLink href={RouteNames.WhatWeDo}>{whatWeDoText}</NavigationLink>
                <NavigationLink href={RouteNames.WhoWeAre}>{whoWeAreText}</NavigationLink>
                <NavigationLink href={RouteNames.HowToSupport}>{howToSupportText}</NavigationLink>
                <ButtonLink href={RouteNames.Donate}>{donateText}</ButtonLink>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </HeaderWrapper>
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
