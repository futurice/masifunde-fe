/* eslint-disable function-paren-newline */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _chunk from 'lodash/chunk'
import { Container } from 'reactstrap'
import { rem } from 'polished'

import TeamMember from '../../components/TeamMember'
import { fetchContactPage } from '../../api/contact'
import Head from '../../components/Head'
import LayoutWrapper from '../../components/LayoutWrapper'
import Markdown from '../../components/Markdown'

const MainHeading = styled.h1`
  text-align: center;
  margin-bottom: ${rem('70px')};
`

const StyledMarkdown = styled(Markdown)`
  text-align: left;
`

const ContactText = styled.span`
  display: block;
  text-align: left;
`

const SecondaryHeading = styled.h2`
  text-align: center;
`

const PictureContainer = styled.div`
  margin-bottom: ${rem('100px')};
`

const AdressContainer = styled.div`
  text-align: center;
  margin-bottom: ${rem('80px')};
`

const mapContact = contact => (
  <TeamMember
    className="col-6 col-sm-4 col-md-3 col-lg-2"
    key={`${contact.image.url} ${contact.region} ${contact.name}`}
    imageUrl={contact.image.url}
    title={contact.region}
    subtitle={contact.name}
    email={contact.email}
  />
)

const Contact = ({
  metaTitle,
  metaDescription,
  mainHeading,
  regionalContactsHeading,
  contactsHeading,
  contacts,
  regionalContacts,
  address,
  email,
  telephone,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <MainHeading>{mainHeading}</MainHeading>

      <SecondaryHeading>{contactsHeading}</SecondaryHeading>
      <PictureContainer className="row justify-content-center">
        {contacts.map(mapContact)}
      </PictureContainer>

      <SecondaryHeading>{regionalContactsHeading}</SecondaryHeading>
      <PictureContainer className="row justify-content-sm-center">
        {_chunk(regionalContacts, 4).map(contactsChunk =>
            contactsChunk.map(mapContact),
        )}
      </PictureContainer>

      <AdressContainer className="row">
        <div className="col-sm d-flex flex-column align-items-center">
          <div>
            <StyledMarkdown source={address} />
            <ContactText>{telephone}</ContactText>
            <a href={`mailto:${email}`}>
              <ContactText>{email}</ContactText>
            </a>
          </div>
        </div>
      </AdressContainer>
    </Container>
  </div>
)

const contactListPropType = PropTypes.arrayOf(
  PropTypes.shape({
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    region: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
)

Contact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  mainHeading: PropTypes.string.isRequired,
  contactsHeading: PropTypes.string.isRequired,
  regionalContactsHeading: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-typos
  contacts: contactListPropType.isRequired,
  // eslint-disable-next-line react/no-typos
  regionalContacts: contactListPropType.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
}

Contact.defaultProps = {
  metaDescription: undefined,
}

Contact.getInitialProps = async function initialProps() {
  return fetchContactPage()
}

export default LayoutWrapper(Contact)
