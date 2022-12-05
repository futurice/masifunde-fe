import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchContactPage } from '../../content/kontakt-content'
import Head from '../../components/Head'
import Markdown from '../../components/shared/Markdown'
import { getLayoutProps } from '../../components/Layout'
import PageSection from '../../components/shared/PageSection'
import TeamMemberList from '../../components/TeamMemberList'
import Divider from '../../components/Divider'
import { smallSpacing } from '../../styling/sizes'

const ContactDetailsContainer = styled.div`
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const TeamMemberListTitle = styled.h3`
  text-align: center;
  margin-bottom: ${smallSpacing};
`

const Contact = ({
  metaTitle,
  metaDescription,
  mainHeading,
  regionalContactsHeading,
  contactsHeading,
  contacts,
  regionalContacts,
  contactDetailsHeading,
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
        title={(member) => member.responsibilityArea}
        subtitle={(member) => member.name}
        imageUrl={(member) => member.image.url}
        email={(member) => member.email}
      />
    </PageSection>

    <PageSection>
      <TeamMemberListTitle>{regionalContactsHeading}</TeamMemberListTitle>
      <TeamMemberList
        members={regionalContacts}
        title={(member) => member.region}
        subtitle={(member) => member.name}
        imageUrl={(member) => member.image.url}
        email={(member) => member.email}
      />
    </PageSection>

    <PageSection>
      <TeamMemberListTitle>{contactDetailsHeading}</TeamMemberListTitle>
      <ContactDetailsContainer className="col-sm ">
        <Markdown source={address} />
        <span>{telephone}</span>
        <a href={`mailto:${email}`}>{email}</a>
      </ContactDetailsContainer>
    </PageSection>

    <PageSection contained={false}>
      <Divider color="grey" />
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
  }).isRequired
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
  contactDetailsHeading: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
}

Contact.defaultProps = {
  metaDescription: undefined,
}

export async function getStaticProps(context) {
  const {
    params: { locale },
  } = context
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await fetchContactPage(locale)),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { locale: 'de' },
      },
      {
        params: { locale: 'en' },
      },
    ],
    fallback: false,
  }
}

export default Contact
