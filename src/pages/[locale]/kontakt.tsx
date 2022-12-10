import styled from 'styled-components'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import {
  ContactContent,
  getContactContent,
} from '../../content/kontakt-content'
import Head from '../../components/shared/Head'
import Markdown from '../../components/shared/Markdown'
import { getLayoutProps, LayoutPageProps } from '../../components/Layout'
import PageSection from '../../components/shared/PageSection'
import TeamMemberList from '../../components/shared/TeamMemberList'
import Divider from '../../components/shared/Divider'
import { smallSpacing } from '../../styling/sizes'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & ContactContent

// Helpers
// =======

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

// Component
// =========

const Contact: FC<Props> = ({
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
        title={(member) => member.responsibilityArea!}
        subtitle={(member) => member.name}
        imageUrl={(member) => member.profileImage.file.url}
        email={(member) => member.email}
      />
    </PageSection>

    <PageSection>
      <TeamMemberListTitle>{regionalContactsHeading}</TeamMemberListTitle>
      <TeamMemberList
        members={regionalContacts}
        title={(member) => member.responsibilityArea}
        subtitle={(member) => member.name}
        imageUrl={(member) => member.profileImage.file.url}
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

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getContactContent(locale)),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
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
