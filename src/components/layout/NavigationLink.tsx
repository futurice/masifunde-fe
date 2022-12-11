import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import { NavItem } from 'reactstrap'
import styled from 'styled-components'
import { lgBreakpoint, mdBreakpoint } from '../../styling/breakpoints'
import { extraSmallSpacing, smallSpacing } from '../../styling/sizes'
import Button from '../Button'
import Link from '../Link'

// Props
// =====

export type Props = {
  type: 'link' | 'button'
  href: string
  children: ReactNode
}

// Constants
// =========

const activeLinkBorderThickness = '3px'

// Helpers
// =======

const NavigationLinkButton = styled(Button)`
  font-size: 18px;
`

type NavigationLinkAnchorProps = {
  activeBorderThickness: string
  isActive: boolean
}

const NavigationLinkAnchor = styled.a<NavigationLinkAnchorProps>`
  font-weight: bold;
  text-align: right;
  white-space: nowrap;
  padding: 0.31rem 0;
  margin-right: ${extraSmallSpacing};

  @media (min-width: ${lgBreakpoint}) {
    margin-right: ${smallSpacing};
  }
  color: inherit !important;
  margin-top: ${(props) => props.activeBorderThickness};
  margin-bottom: ${(props) =>
    props.isActive ? 0 : `${props.activeBorderThickness}`};
  border-bottom: ${(props) =>
    props.isActive
      ? `${props.activeBorderThickness} solid #FE9933 !important`
      : 0};
  @media screen and (max-width: ${mdBreakpoint}) {
    text-align: center;
    margin-right: 0;
  }

  :hover {
    border-bottom: 3px solid ${({ theme }) => theme.pineCone};
    margin-bottom: 0;
  }
`

// Component
// =========

const NavigationLink: FC<Props> = ({ type, href, children }) => {
  const router = useRouter()

  return (
    <NavItem>
      <Link href={href} passHref>
        {type === 'link' ? (
          <NavigationLinkAnchor
            activeBorderThickness={activeLinkBorderThickness}
            className="nav-link"
            isActive={router.pathname.includes(href)}
          >
            {children}
          </NavigationLinkAnchor>
        ) : (
          <NavigationLinkButton type="primary">{children}</NavigationLinkButton>
        )}
      </Link>
    </NavItem>
  )
}

export default NavigationLink
