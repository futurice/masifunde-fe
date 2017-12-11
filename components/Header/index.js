/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'
import styled from 'styled-components'

import { RouteNames } from '../../routes'
import NavigationLink from './NavigationLink'

const HeaderWrapper = styled.div`
  background-color: #f4e3d6;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  min-height: ${props => props.height};
  box-shadow: -1px 1px 1px 1px rgba(250, 242, 230, 0.25);
`

const Logo = styled.img`
  width: 90%;
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
      donateText, howToSupportText, whoWeAreText, whatWeDoText, height,
    } = this.props

    return (
      <HeaderWrapper height={height} className="fixed-top d-flex align-items-center">
        <Container>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/" className="d-flex align-items-center">
              <Link href={RouteNames.Index}>
                <Logo src="/static/logo.svg" alt="Masifunde Logo" />
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto d-flex align-items-center" navbar>
                <NavigationLink type="link" href={RouteNames.WhatWeDo}>{whatWeDoText}</NavigationLink>
                <NavigationLink type="link" href={RouteNames.WhoWeAre}>{whoWeAreText}</NavigationLink>
                <NavigationLink type="link" href={RouteNames.HowToSupport}>{howToSupportText}</NavigationLink>
                <NavigationLink type="button" href={RouteNames.Donate}>{donateText}</NavigationLink>
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

Header.propTypes = {
  ...propTypes,
  height: PropTypes.string.isRequired,
}

export default Header
