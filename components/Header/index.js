/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Container } from 'reactstrap'
import styled from 'styled-components'

import { Link, RouteNames } from '../../routes'
import NavigationLink from './NavigationLink'
import { rem } from '../../styling/typography'

const HeaderWrapper = styled.div`
  background-color: #f4e3d6;
  box-shadow: -1px 1px 1px 1px rgba(250, 242, 230, 0.25);
  font-size: ${rem('16px')}; 
`

const Logo = styled.img`
  width: 9.5rem;
`

const StyledNavbar = styled(Navbar)`
  padding: 0;
  
  a {
    text-align: center;
  }
`

const StyledNavbarBrand = styled(NavbarBrand)`
  height: ${props => props.height};
  padding-top: 0;
  padding-bottom: 0;
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
      <HeaderWrapper className="fixed-top d-flex align-items-center">
        <Container>
          <StyledNavbar color="faded" light expand="md">
            <Link route={RouteNames.Index} passHref>
              <StyledNavbarBrand
                height={height}
                className="d-flex align-items-center"
              >
                <Logo src="/static/images/logo.svg" alt="Masifunde Home" />
              </StyledNavbarBrand>
            </Link>
            <NavbarToggler aria-label="Open navigation menu" onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto d-flex align-items-center" navbar>
                <NavigationLink type="link" href={RouteNames.WhatWeDo}>{whatWeDoText}</NavigationLink>
                <NavigationLink type="link" href={RouteNames.WhoWeAre}>{whoWeAreText}</NavigationLink>
                <NavigationLink type="link" href={RouteNames.HowToSupport}>{howToSupportText}</NavigationLink>
                <NavigationLink type="button" href={RouteNames.Donate}>{donateText}</NavigationLink>
              </Nav>
            </Collapse>
          </StyledNavbar>
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
