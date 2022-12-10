import PropTypes from 'prop-types'
import styled from 'styled-components'
import { mediumSpacing } from '../../styling/sizes'
import List, { ListItem } from '../shared/List'
import Partner, { propTypes as partnerPropTypes } from './Partner'

const StyledList = styled(List)`
  margin-top: ${mediumSpacing};
`

const PartnersList = ({ partnersList, className }) => (
  <StyledList entries={partnersList} className={`row ${className}`}>
    {partnersList.map(({ image, name, link }) => (
      <ListItem key={image.url}>
        <Partner
          link={link}
          image={image}
          name={name}
          key={`${image.url} ${name}`}
        />
      </ListItem>
    ))}
  </StyledList>
)

export const propTypes = {
  partnersList: PropTypes.arrayOf(PropTypes.shape(partnerPropTypes)).isRequired,
  className: PropTypes.string,
}

PartnersList.propTypes = propTypes

PartnersList.defaultProps = {
  className: '',
}

export default PartnersList
