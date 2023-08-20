import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import FundraisingboxForm from '../../../components/FundraisingboxForm'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import RoundedImage from '../../../components/shared/RoundedImage'
import {
  BecomeSponsorContent,
  getBecomeSponsorContent,
} from '../../../content/wie-sie-helfen-content'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & BecomeSponsorContent

// Helpers
// =======

const Image = styled(RoundedImage)`
  width: 100%;
`

// Component
// =========

const BecomeSponsor: FC<Props> = ({
  metaTitle,
  metaDescription,
  title,
  introSubtitle1,
  introMarkdown1,
  introSubtitle2,
  introMarkdown2,
  image,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
}) => {
  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <h1>{title}</h1>

        <div className="row">
          <div className="col-12 col-md-7">
            <h3>{introSubtitle1}</h3>
            <Markdown source={introMarkdown1} />
            <h3>{introSubtitle2}</h3>
            <Markdown source={introMarkdown2} />
          </div>
          <div className="col-12 col-md-5">
            <Image src={image.file.url} alt={image.title} />
          </div>
        </div>
      </PageSection>

      <FundraisingboxForm hash="pr9pjwm89abksr2y" />

      <Banner
        headline={bannerTitle}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getBecomeSponsorContent(locale)),
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

export default BecomeSponsor
