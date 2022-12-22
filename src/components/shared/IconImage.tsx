import { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react'
import styled from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'
import { extraExtraSmallSpacing } from '../../styling/sizes'

// Props
// =====

type HTMLImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

export type Props = HTMLImageProps & {
  /**
   * The size of the icon on the page.
   * Can be any valid CSS length value, e.g. "32px".
   */
  size?: string
}

// Helpers
// =======

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  height: auto;
`

const CoreIconImage: FC<Props> = ({ src, alt, ...rest }) => (
  <div {...rest}>
    <Image src={src} alt={alt} />
  </div>
)

// Component
// =========

const IconImage = styled(CoreIconImage)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${extraExtraSmallSpacing};
  max-width: ${({ size }) => size};
  max-height: ${({ size }) => size};

  @media (min-width: ${smBreakpoint}) {
    margin-bottom: 0;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default IconImage
