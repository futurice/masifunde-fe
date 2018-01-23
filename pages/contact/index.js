/* eslint-disable function-paren-newline */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchContactPage } from '../../api/contact'
import Head from '../../components/Head'
import LayoutWrapper from '../../components/LayoutWrapper'
import Markdown from '../../components/Markdown'
import PageSection from '../../components/PageSection'
import TeamMemberList from '../../components/TeamMemberList'
import Divider from '../../components/Divider'

const StyledMarkdown = styled(Markdown)`
  text-align: left;
`

const ContactText = styled.span`
  display: block;
  text-align: left;
`

const AddressContainer = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const TeamMemberListTitle = styled.h3`
  text-align: center;
`

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

    <PageSection>
      <h1>{mainHeading}</h1>
    </PageSection>

    <PageSection>
      <TeamMemberListTitle>{contactsHeading}</TeamMemberListTitle>
      <TeamMemberList
        members={contacts}
        title={member => member.region}
        subtitle={member => member.name}
        imageUrl={member => member.image.url}
        email={member => member.email}
      />
    </PageSection>

    <PageSection>
      <TeamMemberListTitle>{regionalContactsHeading}</TeamMemberListTitle>
      <TeamMemberList
        members={regionalContacts}
        title={member => member.region}
        subtitle={member => member.name}
        imageUrl={member => member.image.url}
        email={member => member.email}
      />
    </PageSection>

    <PageSection>
      <div className="row">
        <AddressContainer className="col-sm ">
          <div>
            <StyledMarkdown source={address} />
            <ContactText>{telephone}</ContactText>
            <a href={`mailto:${email}`}>
              <ContactText>{email}</ContactText>
            </a>
          </div>
        </AddressContainer>
      </div>
    </PageSection>


    <PageSection contained={false}>
      <Divider />
    </PageSection>
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
