import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rem } from '../styling/typography'
import { teamMemberAndPartnerWidth } from '../utils/constants'
import RoundedImage from './RoundedImage'

const TeamMemberContainer = styled.div`
  max-width: ${teamMemberAndPartnerWidth};
  white-space: nowrap;
`

const Image = styled(RoundedImage)`
  width: 100%;
  margin-bottom: 0.7rem;
`

const Title = styled.div`
  font-weight: bold;
  margin: 0 0 0.3rem 0;
`

const Subtitle = styled.div`
  color: ${({ theme }) => theme.pineCone};
  font-size: ${rem('12px')};
`

const Email = styled.a`
  display: block;
  font-size: ${rem('12px')};
`

const TeamMember = ({ imageUrl, title, subtitle, email, className }) => (
  <TeamMemberContainer className={className}>
    <Image className="img-fluid" src={imageUrl} alt="" />
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    {email && <Email href={`mailto:${email}`}>{email}</Email>}
  </TeamMemberContainer>
)

TeamMember.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  email: PropTypes.string,
  className: PropTypes.string,
}

TeamMember.defaultProps = {
  email: '',
  className: '',
  subtitle: '',
}

export default TeamMember
