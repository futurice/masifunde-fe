import { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { smBreakpoint } from '../../styling/breakpoints'

export type Props = {
  children: ReactNode
  contained?: boolean
}

const sectionSpacing = '5rem'
const sectionSpacingMobile = '4rem'

const pageSectionStyle = css`
  margin-top: ${sectionSpacingMobile};

  @media (min-width: ${smBreakpoint}) {
    margin-top: ${sectionSpacing};
  }
`

const ContainedPageSection = styled.div.attrs({ className: 'container' })`
  ${pageSectionStyle}
`

const UncontainedPageSection = styled.div`
  ${pageSectionStyle}
`

const PageSection: FC<Props> = ({ children, contained = true, ...rest }) =>
  contained ? (
    <ContainedPageSection {...rest}>{children}</ContainedPageSection>
  ) : (
    <UncontainedPageSection {...rest}>{children}</UncontainedPageSection>
  )

export default PageSection
