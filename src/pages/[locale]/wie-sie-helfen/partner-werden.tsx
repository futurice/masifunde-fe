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
import TextWithPortraitPhoto from '../../../components/shared/TextWithPortraitPhoto'
import PartnersList from '../../../components/wer-wir-sind/PartnersList'
import {
  BecomePartnerContent,
  getBecomePartnerContent,
} from '../../../content/wie-sie-helfen-content'

type Params = {
  locale: string
}

type Props = LayoutPageProps & BecomePartnerContent

const BecomePartner: FC<Props> = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  partners,
  section1Title,
  section1Markdown,
  teamMember,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <PageSection>
      <h1>{introTitle}</h1>
      <CenteredText source={introMarkdown} />
      <PartnersList partners={partners} />
    </PageSection>

    <PageSection>
      <TextWithPortraitPhoto
        header={section1Title}
        text={section1Markdown}
        portraitPhotoTitle={teamMember.name}
        portraitPhotoSubtitle={teamMember.responsibilityArea}
        portraitPhotoImageUrl={teamMember.profileImage.file.url}
        portraitPhotoEmail={teamMember.email}
      />
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getBecomePartnerContent(locale)),
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

export default BecomePartner
