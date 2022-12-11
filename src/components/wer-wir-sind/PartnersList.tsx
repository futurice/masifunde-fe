import { FC } from 'react'
import styled from 'styled-components'
import { Partner } from '../../content/wer-wir-sind-content'
import { mediumSpacing } from '../../styling/sizes'
import List, { ListItem } from '../shared/List'
import PartnersListItem from './PartnersListItem'

export type Props = {
  partners: Partner[]
  className?: string
}

const StyledList = styled(List)`
  margin-top: ${mediumSpacing};
`

const PartnersList: FC<Props> = ({ partners, className }) => (
  <StyledList entries={partners} className={`row ${className}`}>
    {partners.map(({ logo, name, link }) => (
      <ListItem key={logo.file.url}>
        <PartnersListItem name={name} logo={logo} link={link} />
      </ListItem>
    ))}
  </StyledList>
)

export default PartnersList
