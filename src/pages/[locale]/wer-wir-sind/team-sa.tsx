import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import CenteredText from '../../../components/CenteredText'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TeamMemberList from '../../../components/shared/TeamMemberList'
import {
  TeamSaContent,
  getTeamSaContent,
} from '../../../content/wer-wir-sind-content'
import { smallSpacing } from '../../../styling/sizes'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & TeamSaContent

// Helpers
// =======

const Image = styled.img`
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  margin-top: ${smallSpacing};
  margin-bottom: ${smallSpacing};
`

// Component
// =========

const TeamSa: FC<Props> = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  introImage,
  teamMembers,
  bannerButtonText,
  bannerTitle,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <ImageContainer>
        <Image
          className="col-sm-7 col-md-6 col-lg-5"
          src={introImage.file.url}
          alt={introImage.title}
        />
      </ImageContainer>
    </PageSection>

    <PageSection>
      <TeamMemberList
        members={teamMembers}
        title={(member) => member.name}
        subtitle={(member) => member.responsibilityArea}
        imageUrl={(member) => member.profileImage.file.url}
      />
    </PageSection>

    <Banner
      buttonLink={bannerButtonUrl}
      buttonText={bannerButtonText}
      headline={bannerTitle}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getTeamSaContent(locale)),
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

export default TeamSa
