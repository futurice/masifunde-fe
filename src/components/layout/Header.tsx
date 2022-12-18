import T from 'i18n-react'
import { FC, useState } from 'react'
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap'
import styled from 'styled-components'
import { HeaderContent } from '../../content/layout-content'
import * as pages from '../../routes/pages'
import { rem } from '../../styling/typography'
import Link from '../shared/Link'
import NavigationLink from './NavigationLink'

// Props
// =====

export type Props = HeaderContent & {
  height: string
}

// Helpers
// =======

const HeaderWrapper = styled.header`
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
  height: ${(props) => props.height};
  padding-top: 0;
  padding-bottom: 0;
`

// Component
// =========

const Header: FC<Props> = ({
  donateText,
  howToSupportText,
  whoWeAreText,
  whatWeDoText,
  height,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <HeaderWrapper className="fixed-top d-flex align-items-center">
      <Container>
        <StyledNavbar color="faded" light expand="md">
          <Link href={pages.index} passHref>
            <StyledNavbarBrand
              height={height}
              className="d-flex align-items-center"
            >
              <Logo src="/static/images/logo.svg" alt="Masifunde Home" />
            </StyledNavbarBrand>
          </Link>

          <NavbarToggler
            title={T.translate('header.openNavigation') as string}
            onClick={toggle}
          />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex align-items-center" navbar>
              <NavigationLink type="link" href={pages.whatWeDo}>
                {whatWeDoText}
              </NavigationLink>
              <NavigationLink type="link" href={pages.whoWeAre}>
                {whoWeAreText}
              </NavigationLink>
              <NavigationLink type="link" href={pages.howToSupport}>
                {howToSupportText}
              </NavigationLink>
              <NavigationLink type="button" href={pages.donate}>
                {donateText}
              </NavigationLink>
            </Nav>
          </Collapse>
        </StyledNavbar>
      </Container>
    </HeaderWrapper>
  )
}

export default Header
