import Script from 'next/script'
import { FC, memo, useMemo } from 'react'
import { Container } from 'reactstrap'

type Props = {
  /** The hash identifier of the form to display. */
  hash: string
}

const FundraisingboxForm: FC<Props> = memo(function FundraisingboxForm({
  hash: hash,
}: Props) {
  const formUrl = useMemo(() => {
    const baseUrl = 'https://secure.fundraisingbox.com/app/paymentJS'
    const params = new URLSearchParams({ hash })
    return `${baseUrl}?${params.toString()}`
  }, [hash])

  return (
    <>
      {/*
       * Container for Fundraisingbox iframe.
       *
       * The Fundraisingbox script tries to create it itself with
       * `document.write`, but browsers ignore calls this method
       * from asynchronously loaded scripts:
       *
       * https://developer.mozilla.org/en-US/docs/Web/API/Document/write
       */}
      <div id="fbIframeDiv" style={{ position: 'relative' }}></div>

      {/* Fundraisingbox logo (required by Fundraisingbox) */}
      <Container>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.fundraisingbox.com"
        >
          <img
            style={{ border: '0 !important' }}
            src="https://secure.fundraisingbox.com/images/FundraisingBox-Logo-Widget.png"
            alt="Powered by FundraisingBox"
          />
        </a>
      </Container>

      {/*
       * Fundraisingbox script
       * https://wikando.freshdesk.com/de/support/solutions/articles/79000127055-formular-konfigurieren-und-einbetten
       */}
      <Script id={`fundraisingbox-${hash}`} src={formUrl} />
    </>
  )
})

export default FundraisingboxForm
