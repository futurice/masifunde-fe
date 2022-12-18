import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import Banner from '../../../components/Banner'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import CenteredText from '../../../components/shared/CenteredText'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import TeamMemberList from '../../../components/shared/TeamMemberList'
import RegionalGroups from '../../../components/wer-wir-sind/RegionalGroups'
import {
  TeamDeContent,
  getTeamDeContent,
} from '../../../content/wer-wir-sind-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & TeamDeContent

// Component
// =========

const TeamDe: FC<Props> = ({
  title,
  pageDescription,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
  sectionOneTitle,
  sectionOneText,
  sectionTwoTitle,
  regionalGroups,
  teamMembers,
  metaTitle,
  metaDescription,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{title}</h1>
      <CenteredText source={pageDescription} />
    </PageSection>

    <PageSection>
      <h2>{sectionOneTitle}</h2>
      <CenteredText source={sectionOneText} />
      <RegionalGroups regionalGroups={regionalGroups} />
    </PageSection>

    <PageSection>
      <h2>{sectionTwoTitle}</h2>
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
      ...(await getTeamDeContent(locale)),
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

export default TeamDe
