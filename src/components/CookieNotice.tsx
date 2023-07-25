import T from 'i18n-react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as pages from '../routes/pages'
import { smBreakpoint } from '../styling/breakpoints'
import { extraExtraSmallSpacing, extraSmallSpacing } from '../styling/sizes'
import { haveCookiesBeenAccepted, markCookiesAccepted } from '../utils/cookies'
import Button from './shared/Button'
import Link from './shared/Link'

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

const PrivacyPolicyButton = styled(Button).attrs({ variant: 'banner' })`
  white-space: nowrap;
`

const AcceptButton = styled(Button).attrs({ variant: 'banner' })`
  margin-left: ${extraExtraSmallSpacing};
  white-space: nowrap;
`

const CookieNotice = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // We cannot check for cookie acceptance on the server because that
    // doesn't have access to the browser's localStorage. We thus need
    // to do the check in an effect.
    setVisible(!haveCookiesBeenAccepted())
  }, [])

  const handleAccept = () => {
    markCookiesAccepted()
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <Banner>
      <Text>{T.translate('cookieNotice.text')}</Text>

      <Buttons>
        <Link href={pages.datenschutz} passHref>
          <PrivacyPolicyButton variant="banner">
            {T.translate('cookieNotice.privacyPolicy')}
          </PrivacyPolicyButton>
        </Link>
        <AcceptButton onClick={handleAccept}>
          {T.translate('cookieNotice.accept')}
        </AcceptButton>
      </Buttons>
    </Banner>
  )
}

export default CookieNotice
