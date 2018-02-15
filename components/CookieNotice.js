/* eslint-disable jsx-a11y/anchor-is-valid */
import T from 'i18n-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { RouteNames } from '../routes'
import { smBreakpoint } from '../styling/breakpoints'
import { extraSmallSpacing, extraExtraSmallSpacing } from '../styling/sizes'
import Button from './Button'
import Link from './Link'

const Banner = styled.div.attrs({ role: 'dialog' })`
  background-color: ${({ theme }) => theme.orange};

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${extraSmallSpacing};

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
  }
`

const Text = styled.p`
  color: white;
  margin: 0;
  text-align: center;
  /* for IE 11 */
  max-width: 100%;
`

const Buttons = styled.div`
  margin-top: ${extraSmallSpacing};
  display: flex;

  /* for IE 11 */
  flex-shrink: 0;

  @media (min-width: ${smBreakpoint}) {
    flex-direction: row;
    margin-top: 0;
    margin-left: ${extraSmallSpacing};
  }
`

const PrivacyPolicyButton = styled(Button).attrs({ type: 'banner' })`
  white-space: nowrap;
`

const AcceptButton = styled(Button).attrs({ type: 'banner' })`
  margin-left: ${extraExtraSmallSpacing};
  white-space: nowrap;
`

const CookieNotice = ({ onAccept }) => (
  <Banner>
    <Text>
      {T.translate('cookieNotice.text')}
    </Text>

    <Buttons>
      <Link route={RouteNames.Datenschutz} passHref>
        <PrivacyPolicyButton type="banner">
          {T.translate('cookieNotice.privacyPolicy')}
        </PrivacyPolicyButton>
      </Link>
      <AcceptButton onClick={onAccept}>
        {T.translate('cookieNotice.accept')}
      </AcceptButton>
    </Buttons>
  </Banner>
)

CookieNotice.propTypes = {
  onAccept: PropTypes.func.isRequired,
}

export default CookieNotice
